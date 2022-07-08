import py_compile
import mysql.connector
from flask import Flask, request, jsonify
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS
from flask_mqtt import Mqtt
from item import Item, ItemList, Radar, RadarList
# from HelloApiHandler import HelloApiHandler
from colorama import Cursor
import time
import datetime
import re
app = Flask(__name__)
CORS(app)
api = Api(app)

#Configure Flask-MQTT Extension

app.config['MQTT_BROKER_URL'] = "192.168.4.39"  #broker 
# app.config['MQTT_BROKER_URL'] = 'broker.emqx.io'  #broker for tesing on mqtt x
app.config['MQTT_BROKER_PORT'] = 1883
app.config['MQTT_USERNAME'] = ''  # Set this item when you need to verify username and password
app.config['MQTT_PASSWORD'] = ''  # Set this item when you need to verify username and password
app.config['MQTT_KEEPALIVE'] = 5  # Set KeepAlive time in seconds
app.config['MQTT_TLS_ENABLED'] = False  # If your server supports TLS, set it True
# topic = '/flask/mqttapp'
topic = 'Capstone_S39'

# ssid: ESP32-AP-S39
# password: CAPSTONES39
# mqtt_server = "192.168.4.39"
mqtt_client = Mqtt(app)

#connect callback function

@mqtt_client.on_connect()
def handle_connect(client, userdata, flags, rc):
   if rc == 0:
       print('Connected successfully')
       mqtt_client.subscribe(topic) # subscribe topic
   else:
       print('Bad connection. Code:', rc)


@mqtt_client.on_message()
def handle_mqtt_message(client, userdata, message):
   data = dict(
       topic=message.topic,
       payload=message.payload.decode()
  )
   newdata = data['payload'].strip()
   newdata = newdata.replace('{', '')
   newdata = newdata.replace('}', '')
   newdata = newdata.replace("'","")
   newdata = newdata.split(",")
   print(newdata)

   print(f'Received message on topic: {data["topic"]} with payload: {newdata}')
   print(type(newdata))
   mydata = []
   if len(newdata)== 5:
      for string in newdata:
         result = re.findall(r"[-+]?\d*\.\d+|\d+", string) 
         print(result)
         mydata.append(result[0])

      ###########MYSQL
      ts = time.time()
      thetimestamp = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')
      connection = mysql.connector.connect(
         host="localhost",
         user = "root",
         password = "Lwy6801!",
         database= "thalesradar"
      )
      cursor = connection.cursor()
      query= "INSERT INTO DataLog VALUES (%s,%s,%s,%s,%s,%s)"  
      try:
         cursor.execute(query, (thetimestamp, mydata[0], mydata[1], mydata[2], mydata[3], mydata[4]))
         ## cursor.execute(query, (thetimestamp, int(mydata[0]), int(mydata[1]), int(mydata[2]), int(mydata[3])))
         print(query)
         connection.commit()
      except IndexError:
         print("check payload and values")
      connection.close()
      #mqtt_client.unsubscribe(topic)

   else:
      pass


# @mqtt_client.on_connect()
# def handle_connect(client, userdata, flags, rc):
#    if rc == 0:
#        print('Connected successfully')
#        mqtt_client.subscribe('IP') # subscribe topic
#    else:
#        print('Bad connection. Code:', rc)

#create message publish API
@app.route('/publishparameter', methods=['POST'])
def publish_message():
   request_data = request.get_json()
   print(request_data)
   publish_result = mqtt_client.publish(request_data['topic'], request_data['msg'],qos=1)
   print(f'this is what is published :{publish_result}')
   return jsonify({'code': publish_result[0]})



api.add_resource(Item, '/item/<string:logtimestamp>') 
api.add_resource(ItemList,'/items')
api.add_resource(Radar,'/radar/<string:radarid>')
api.add_resource(RadarList,'/radars')
# api.add_resource(HelloApiHandler, '/item/hello')

if __name__ == '__main__':
    app.run(port=5000,debug=True)  # important to mention debug=True
