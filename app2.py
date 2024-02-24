from elasticsearch import Elasticsearch
from elasticsearch.exceptions import ConnectionTimeout, NotFoundError, ElasticsearchException
from datetime import datetime, timedelta, timezone
import logging
from abc import ABC, abstractmethod
import pytz

class ElasticsearchBackend(ABC):
    def __init__(self, hosts):
        self.es = self.connect_to_elasticsearch(hosts)
    
    def connect_to_elasticsearch(self, hosts):
        try:
            es = Elasticsearch(hosts, timeout=1300)
            if es.ping():
                logging.info("Connected to Elasticsearch.")
                return es
            else:
                logging.error("Elasticsearch connection failed.")
                return None
        except Exception as e:
            logging.error(f"Error connecting to Elasticsearch: {e}")
            return None
    
    @abstractmethod
    def get_alerts(self, responder_name, start_date=None, end_date=None):
        pass
    
    @abstractmethod
    def get_unique_responder_names(self):
        pass
    
    @abstractmethod
    def trend_analysis(self):
        pass
    
    # @abstractmethod
    # def trend_analysis_priority_based(self):
    #     pass

    
    def trend_analysis(self, responder_name):
        # Calculate the date range for the last two months from today, in IST
        ist = pytz.timezone('Asia/Kolkata')
        end_date = datetime.now(ist)
        start_date = end_date - timedelta(days=60)
        
        # Convert start and end dates to UTC, as Elasticsearch stores dates in UTC
        # Ensure that the format matches the one expected by your Elasticsearch index
        start_date_utc = start_date.astimezone(pytz.utc).strftime('%Y/%m/%d %H:%M:%S')
        end_date_utc = end_date.astimezone(pytz.utc).strftime('%Y/%m/%d %H:%M:%S')

        query = {
            "query": {
                "bool": {
                    "must": [
                        {"term": {"parsedMessage.attributes.responders.name.keyword": responder_name}},
                        {"range": {
                            "parsedMessage.attributes.createdAtTime": {
                                "gte": start_date_utc,
                                "lt": end_date_utc
                            }
                        }}
                    ]
                }
            },
            "size": 0,  
            "aggs": {
                "alerts_per_day": {
                    "date_histogram": {
                        "field": "parsedMessage.attributes.createdAtTime",
                        "calendar_interval": "day",
                        "format": "yyyy-MM-dd"  # Output format of the date
                    }
                }
            }
        }

        try:
            response = self.es.search(index="entity.alert", body=query)
            # Process the response to extract and format the trend data
            buckets = response.get('aggregations', {}).get('alerts_per_day', {}).get('buckets', [])
            trend_data = [{"date": bucket['key_as_string'], "count": bucket['doc_count']} for bucket in buckets]
            return trend_data
        except Exception as e:
            logging.error(f"Error performing trend analysis: {e}")
            return []

    def get_unique_responder_names(self):
        query = {
            "size": 0,
            "aggs": {
                "unique_responder_names": {
                    "composite": {
                        "size": 10000,
                        "sources": [{"responder_name": {"terms": {"field": "parsedMessage.attributes.responders.name.keyword"}}}]
                    }
                }
            }
        }
        try:
            response = self.es.search(index="entity.alert", body=query)
            buckets = response.get('aggregations', {}).get('unique_responder_names', {}).get('buckets', [])
            unique_names = [bucket['key']['responder_name'] for bucket in buckets if '@' not in bucket['key']['responder_name']]
            return unique_names
        except ConnectionTimeout:
            logging.error("Connection timeout when fetching unique responder names.")
        except NotFoundError:
            logging.error("Index not found when fetching unique responder names.")
        except ElasticsearchException as e:
            logging.error(f"Unexpected Elasticsearch error: {e}")
        except Exception as e:
            logging.error(f"General error when fetching unique responder names: {e}")
        return []
    
    def format_date(self, date, time):
        formatted_date = date.replace("-", "/")
        datetime_str = f"{formatted_date} {time}"
        return datetime_str
    
    def format_for_es(self, date, time):
       
        formatted_date = date.replace("-", "/")
        
        datetime_str = f"{formatted_date} {time}"
        return datetime_str




    
    def get_alerts(self, responder_name, start_date=None, end_date=None, start_time="00:00:00", end_time="23:59:59"):
        # Check if start_date or end_date is None, default to current date
        if not start_date:
            start_date = datetime.now(timezone.utc).strftime("%Y-%m-%d")
        if not end_date:
            end_date = start_date

        # Format start and end datetime using the provided date and time
        formatted_start_datetime = self.format_for_es(start_date, start_time)
        formatted_end_datetime = self.format_for_es(end_date, end_time)

        


        query = {
            "query": {
                "bool": {
                    "must": [
                        {"term": {"parsedMessage.attributes.responders.name.keyword": responder_name}},
                        {"range": {
                            "parsedMessage.attributes.createdAtTime": {
                                "gte": formatted_start_datetime,
                                "lt": formatted_end_datetime
                            }
                        }}
                    ]
                }
            }
        }
      
    
        logging.info(f"query:{query}")
        
        all_alerts = []
        try:
            page = self.es.search(index="entity.alert", body=query, scroll='1m', size=100)
            scroll_id = page['_scroll_id']
            alerts = [hit["_source"] for hit in page['hits']['hits']]
            while len(page['hits']['hits']):
                page = self.es.scroll(scroll_id=scroll_id, scroll='1m')
                scroll_id = page['_scroll_id']
                alerts.extend([hit["_source"] for hit in page['hits']['hits']])
            all_alerts.extend(alerts)
        except Exception as e:
            logging.error(f"Error fetching alerts: {e}")

        if 'scroll_id' in locals():
            self.es.clear_scroll(scroll_id=scroll_id)

        return all_alerts
    
   

    
    
    
    def flatten_json(self, y):
        out = {}
        def flatten(x, name=''):
            if type(x) is dict:
                for a in x:
                    flatten(x[a], name + a + '_')
            elif type(x) is list:
                i = 0
                for a in x:
                    flatten(a, name + str(i) + '_')
                    i += 1
            else:
                out[name[:-1]] = x
        flatten(y)
        return out
    
    def convert_milliseconds_to_datetime(self, value, alert_id="", field_name=""):
        try:
            # Check if the value is a string that represents a datetime
            if isinstance(value, str):
                try:
                    # Directly return the string if it's in the correct format
                    datetime.strptime(value, '%Y/%m/%d %H:%M:%S')
                    return value
                except ValueError:
                    # Log error if the string cannot be parsed
                    logging.error(f"Error parsing datetime string for Alert ID: {alert_id}, Field: {field_name}, Value: {value}")
                    return "Invalid Timestamp"

            # If the value is numeric, proceed with conversion
            milliseconds = float(value)
            if milliseconds < -2208988800000 or milliseconds > 253402300799999:
                # Log error if the timestamp is out of the valid range
                logging.error(f"Timestamp out of range for Alert ID: {alert_id}, Field: {field_name}, Value: {milliseconds}")
                return "Invalid Timestamp"
            
            # Convert milliseconds to datetime
            utc_datetime = datetime.utcfromtimestamp(milliseconds / 1000.0)
            ist_datetime = utc_datetime + timedelta(hours=5, minutes=30)
            return ist_datetime.strftime('%Y/%m/%d %H:%M:%S')
        except Exception as e:
            logging.error(f"Unexpected error converting timestamp for Alert ID: {alert_id}, Field: {field_name}, Value: {value}, Error: {e}")
            return "Invalid Timestamp"


  

    def convert_milliseconds_to_minutes(self, milliseconds):
        return milliseconds / (1000.0 * 60)

    def is_milliseconds(self, value):
        try:
            float(value)
            return True
        except ValueError:
            return False
        
    def calculate_minutes_between_datetimes(self, datetime_str1, datetime_str2):
        dt_format = '%Y/%m/%d %H:%M:%S'
        if datetime_str1 == "Invalid Timestamp" or datetime_str2 == "Invalid Timestamp":
            logging.error(f"Invalid timestamp provided for calculation: {datetime_str1}, {datetime_str2}")
            # Return a default value or handle as needed
            return 0
        try:
            datetime1 = datetime.strptime(datetime_str1, dt_format)
            datetime2 = datetime.strptime(datetime_str2, dt_format)
            delta = datetime2 - datetime1
            return delta.total_seconds() / 60
        except ValueError as e:
            logging.error(f"Error parsing datetime for calculation: {e}")
            return 0


    def map_field_names(self, flattened_alert):
        readable_alert = {}
        direct_mappings = {
            'parsedMessage_attributes_cluster': 'Cluster',
            'parsedMessage_attributes_service': 'Service',
            'parsedMessage_attributes_priority': 'Priority',
            'parsedMessage_attributes_alertType': 'AlertType',
            'parsedMessage_attributes_message': 'AlertName',
            'parsedMessage_attributes_status': 'Status',
            'parsedMessage_attributes_severity': 'Severity',
            'parsedMessage_attributes_acknowledged': 'Acknowledged',
            'parsedMessage_attributes_alertCloseTime': 'AlertCloseTime',
            'parsedMessage_attributes_acknowledgedBy': 'AckBy',
            'parsedMessage_attributes_closedBy': 'ClosedBy',
            'parsedMessage_attributes_tinyId': 'TinyID',
            'parsedMessage_attributes_responders_0_name': 'Team', 
            'parsedMessage_attributes_alertId': 'AlertID',
            'parsedMessage_attributes_runbook_url': 'RunbookUrl',
            'parsedMessage_attributes_zoneId': 'Zone',
            'parsedMessage_attributes_bu': 'BU',
            'parsedMessage_attributes_createdAtTime': 'CreatedAtTime',
            'parsedMessage_attributes_updatedAtTime': 'UpdatedAtTime',
        }

        for key, value in flattened_alert.items():
            new_key = direct_mappings.get(key)
            if new_key:
                readable_alert[new_key] = value

        # Process responder fields
        responder_fields = [
            ('parsedMessage_attributes_responders_0_onCalls_0_contacts_0_emailId', 'PrimaryResponderEmail'),
            ('parsedMessage_attributes_responders_0_onCalls_1_contacts_0_emailId', 'SecondaryResponderEmail'),
        ]

        for field_key, readable_key in responder_fields:
            if field_key in flattened_alert:
                readable_alert[readable_key] = flattened_alert[field_key]
                
        

      
        
    
        # Example heuristic for AlertAckTime when not explicitly available
        if readable_alert.get('Acknowledged') == 'true' and 'UpdatedAtTime' in readable_alert:
            readable_alert['AlertAckTime'] = readable_alert.get('UpdatedAtTime')  # Using UpdatedAtTime as a proxy
            
        if 'CreatedAtTime' in readable_alert and 'AlertAckTime' in readable_alert:
            readable_alert['TimeToAck'] = self.calculate_minutes_between_datetimes(
                readable_alert['CreatedAtTime'], 
                readable_alert['AlertAckTime']
            )
            
            # Calculate TimeToAck and TimeToClose if possible
        
        if readable_alert.get('CreatedAtTime') and readable_alert.get('AlertCloseTime'):
            readable_alert['TimeToClose'] = self.calculate_minutes_between_datetimes(readable_alert['CreatedAtTime'], readable_alert['AlertCloseTime'])

        # Aggregate tags
        tag_keys = [key for key in flattened_alert if key.startswith('parsedMessage_attributes_tags_')]
        tags = [flattened_alert[key] for key in tag_keys]
        readable_alert['Tags'] = ', '.join(tags)

        # Default values for missing fields
        defaults = {'Cluster': 'Notfound', 'Zone': 'Notfound', 'Acknowledged': 'false'}
        for field, default_value in defaults.items():
            readable_alert.setdefault(field, default_value)

        # Construct AlertURL if AlertID is present
        if alert_id := readable_alert.get('AlertID'):
            readable_alert['AlertURL'] = f"https://zeta.app.opsgenie.com/alert/detail/{alert_id}/details"
        


        return readable_alert

    
    

    

if __name__ == "__main__":

    es_backend = ElasticsearchBackend(hosts=["http://apm-logging-es.internal.olympus-world.zetaapps.in:9200"])
    

    responder_name = "olympus_middleware_sre" 
    # start_date = "2024-02-22"  
    # end_date = "2024-02-22"
    # start_time = "00:00:00"  
    # end_time = "23:59:59"


    # alerts = es_backend.get_alerts(responder_name, start_date, end_date, start_time, end_time)
    # a = [es_backend.map_field_names(es_backend.flatten_json(alert)) for alert in alerts]
    trend_data = es_backend.trend_analysis(responder_name)
    print(trend_data)



