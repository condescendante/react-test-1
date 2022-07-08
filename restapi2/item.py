import mysql.connector
from colorama import Cursor
from flask import Flask, request, jsonify
from flask_restful import Resource, reqparse
import time
import datetime
import re

#from flask_jwt import jwt_required

connection = mysql.connector.connect(
    host="localhost",
    user = "root",
    password = "Lwy6801!",
    database= "thalesradar"
)
# cursor = connection.cursor()
# query= "INSERT INTO DataLog VALUES (%s,%s,%s,%s,%s)"
# # item = {'logtimeid': 100000, 'horiangle': 60, 'vertiangle': 60, 'temp': 45,'angvelo': 60}
# item = (1,  60, 60, 45,60)
# cursor.execute(query, (item))
# connection.commit()

class Item(Resource): #retrieve datalogs from resource class
    parser = reqparse.RequestParser()
    parser.add_argument('logtimestamp',
        type = datetime,
        required=True,
        help="This field cannot be left blank."
    )

    parser.add_argument('startaziangle',
        type = str,
        required=True,
        help="This field cannot be left blank."
    )

    parser.add_argument('endaziangle',
        type = str,
        required=True,
        help="This field cannot be left blank."
    )

    parser.add_argument('temp',
        type = str,
        required=True,
        help="This field cannot be left blank."
    )

    parser.add_argument('scan_rate',
        type = str,
        required=True,
        help="This field cannot be left blank."
    )

    parser.add_argument('eleangle',
        type = str,
        required=True,
        help="This field cannot be left blank."
    )
    
    def get(self,logtimestamp):
        item = self.find_by_name(logtimestamp)
        if item:
            return {
            'resultStatus': 'SUCCESS',
            'items': item}
        return {'message': 'Item not found'}, 404 
    
    @classmethod
    def find_by_name(cls,logtimestamp):
        # ts = time.time()
        # thetimestamp = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')
        connection = mysql.connector.connect(
            host="localhost",
            user = "root",
        password = "Lwy6801!",
        database= "thalesradar"
        )
        cursor = connection.cursor()
        query = "SELECT * from DataLog WHERE logtimestamp = (%s)"
        cursor.execute(query, (logtimestamp,))
        row = cursor.fetchall()

        items=[]
        for x in row:
            items.append({'logtimestamp': str(x[0]), 'startaziangle': str(x[1]),'endaziangle': str(x[2]), 'eleangle': str(x[3]),'temp': str(x[4]),'scan_rate': str(x[5])},) 
        print(items)
        if len(items) != 0:
            return items
        connection.close()
        
        return {
            'message' : f'no item with logtimestamp = {logtimestamp}'
        }

    def post(self,logtimestamp):
        if self.find_by_name(logtimestamp) :
            data = Item.parser.parse_args()
            print(data)
            item = {'logtimestamp': logtimestamp, 'startaziangle': data['startaziangle'],'endaziangle': data['endaziangle'],'eleangle': data['eleangle'], 'temp': data['temp'], 'scan_rate': data['scan_rate']}
        try:
            self.insert(item)
        
        except:
            return {"message": "An error occurred inserting the item."}, 500 #Internal Server Error

        return item, 201

    @classmethod
    def insert(cls,item):
        connection = mysql.connector.connect(
            host="localhost",
            user = "root",
        password = "Lwy6801!",
        database= "thalesradar"
        )
        cursor = connection.cursor()
        query= "INSERT INTO DataLog VALUES (%s,%s,%s,%s,%s,%s)"
        print(query)
        cursor.execute(query, (item['logtimestamp'], item['startaziangle'],item['endaziangle'],item['eleangle'],item['temp'], item['scan_rate']))

        connection.commit()
        connection.close()
    
    def delete(self,logtimestamp):
        connection = mysql.connector.connect(
            host="localhost",
            user = "root",
        password = "Lwy6801!",
        database= "thalesradar"
        )
        cursor = connection.cursor()
        query= "DELETE FROM DataLog WHERE logtimestamp=%s"
        cursor.execute(query, (logtimestamp,))

        connection.commit()
        connection.close()

        return {'message': "Item deleted."}



    # def delete(self,name):
    #     global items
    #     items = list(filter(lambda x: x['name']!= name, items)) #uses loal, so must state global
    #     return {'message': "Item deleted."}

    # def put(self,logtimestamp):
    #     data = Item.parser.parse_args()

    #     item = self.find_by_name(logtimestamp)
    #     updated_item = {'logtimestamp': logtimestamp, 'angle': data['horiangle'], 'temp': data['temp'], 'scan_rate': data['scan_rate']}
    #     if item is None:
    #         try:
    #             self.insert(updated_item)
    #         except:
    #             return {"message": "An error occurred inserting the item."}, 500 #Internal Server Error

    #     else:
    #         try:
    #             self.update(updated_item)
    #         except:
    #             return {"message": "An error occurred inserting the item."}, 500 #Internal Server Error
    #     return updated_item

    # @classmethod
    # def update(cls,item):
    #     connection = mysql.connector.connect(
    #         host="localhost",
    #         user = "root",
    #     password = "Lwy6801!",
    #     database= "thalesradar2"
    #     )
    #     cursor = connection.cursor()
    #     query= "UPDATE DataLog SET startaziangle=%s,endaziangle=%s,eleangle=%s, temp=%s, scan_rate=%s WHERE logtimestamp=%s"
    #     cursor.execute(query, (item['startaziangle'],item['endaziangle'],item['eleangle'],item['temp'], item['scan_rate'],item['logtimestamp']))

    #     connection.commit()
    #     connection.close()

class ItemList(Resource):
    def get(self):
        connection = mysql.connector.connect(
            host="localhost",
            user = "root",
        password = "Lwy6801!",
        database= "thalesradar"
        )
        cursor = connection.cursor()
        query= """SELECT * FROM DataLog ORDER BY logtimestamp DESC LIMIT 1"""
        cursor.execute(query)
        row = cursor.fetchall()
        # print(row)
        # items = []
        # for x in row:
        #     items.append({'logtimestamp': x[0], 'horiangle': x[1], 'temp': x[2]})
        items=[]
        for x in row:
            items.append({'logtimestamp': str(x[0]), 'startaziangle': str(x[1]),'endaziangle': str(x[2]), 'eleangle': str(x[3]),'temp': str(x[4]),'scan_rate': str(x[5])},) 
        # connection.commit()
        connection.close()
        
        return {
            'resultStatus': 'SUCCESS',
            'items': items}

class Radar(Resource): #retrieve radars from resource class
    parser = reqparse.RequestParser()
    TABLE_NAME = 'InputParameters'

    parser.add_argument('startaziangleip',
        type = str,
        required=True,
        help="This field cannot be left blank."
    )
    parser.add_argument('endaziangleip',
        type = str,
        required=True,
        help="This field cannot be left blank."
    )
    
    parser.add_argument('eleangleip',
        type = str,
        required=True,
        help="This field cannot be left blank."
    )

    parser.add_argument('scan_rateip',
        type = str,
        required=True,
        help="This field cannot be left blank."
    )

    # parser.add_argument('timestampip',
    #     type = str,
    #     required=True,
    #     help="This field cannot be left blank."
    # )

    def get(self,radarid):
        radar = self.find_by_name(radarid)
        if radar:
            return radar
        return {'message': 'Radar not found'}, 404 
    
    @classmethod
    def find_by_name(cls,radarid):
        ts = time.time()
        thetimestamp = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')
        connection = mysql.connector.connect(
            host="localhost",
            user = "root",
        password = "Lwy6801!",
        database= "thalesradar"
        )
        cursor = connection.cursor()
        query = "SELECT * from InputParameters WHERE radarid=(%s)"
        cursor.execute(query, (radarid,))
        row = cursor.fetchall()
        print(row)

        radars=[]
        for x in row:
            radars.append({'radarid': str(x[0]), 'startaziangleip': str(x[1]), 'endaziangleip': str(x[2]),'eleangleip': str(x[3]),'scan_rateip': str(x[4]), 'timestampip': thetimestamp},) 
        print(radars)
        if len(radars) != 0:
            return radars
        connection.close()
        
        return {
            'message' : f'no item with radarid = {radarid}'
        }

    def post(self,radarid):
        if self.find_by_name(radarid) :
            data = Radar.parser.parse_args()
            print(data)
            radar = {'radarid': radarid, 'startaziangleip': data['startaziangleip'],'endaziangleip': data['endaziangleip'],'eleangleip': data['eleangleip'], 'scan_rateip': data['scan_rateip']}
        try:
            self.insert(radar)
        
        except:
            return {"message": "An error occurred inserting the radar parameters."}, 500 #Internal Server Error

        return radar, 201

    @classmethod
    def insert(cls,radar):
        ts = time.time()
        thetimestamp = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')
        # radar['timestampip'] = thetimestamp
        # print(thetimestamp)
        connection = mysql.connector.connect(
            host="localhost",
            user = "root",
        password = "Lwy6801!",
        database= "thalesradar"
        )
        cursor = connection.cursor()
        query= "INSERT INTO InputParameters VALUES (%s,%s,%s,%s,%s,%s)"
        print(query)
        cursor.execute(query, (radar['radarid'], radar['startaziangleip'],radar['endaziangleip'],radar['eleangleip'],radar['scan_rateip'], thetimestamp))

        connection.commit()
        connection.close()

    def put(self,radarid):
        data = Radar.parser.parse_args()

        radar = self.find_by_name(radarid)
        print(radar)
        
        if len(radar) == 0:
            # try:
            #     # self.insert(updated_radar)
            #     return {"message" : f'no item with radarid = {radarid}'}
            # except:
            #     return {"message": "An error occurred inserting radar parameters."}, 500 #Internal Server Error
            return {"message" : f'no item with radarid = {radarid}'}
        else:
            try:
                updated_radar = {'radarid': radarid, 'startaziangleip': data['startaziangleip'],'endaziangleip': data['endaziangleip'], 'eleangleip': data['eleangleip'], 'scan_rateip': data['scan_rateip']}
                self.update(updated_radar)
                return updated_radar
            except:
                return {"message": "An error occurred inserting the radar parameters."}, 500 #Internal Server Error
        

    @classmethod
    def update(cls,radar):
        ts = time.time()
        thetimestamp = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')
        connection = mysql.connector.connect(
            host="localhost",
            user = "root",
        password = "Lwy6801!",
        database= "thalesradar"
        )
        cursor = connection.cursor()
        query= "UPDATE {table} SET startaziangleip=%s,endaziangleip=%s,eleangleip=%s, scan_rateip=%s, timestampip=%s WHERE radarid=%s".format(table=cls.TABLE_NAME)
        cursor.execute(query, (radar['startaziangleip'],radar['endaziangleip'],radar['eleangleip'],radar['scan_rateip'], thetimestamp,radar['radarid']))

        connection.commit()
        connection.close()

class RadarList(Resource):
    def get(self):
        connection = mysql.connector.connect(
            host="localhost",
            user = "root",
        password = "Lwy6801!",
        database= "thalesradar"
        )
        cursor = connection.cursor()
        query= """SELECT * FROM InputParameters ORDER BY timestampip DESC LIMIT 5"""
        cursor.execute(query)
        row = cursor.fetchall()
        # print(row)
        # items = []
        # for x in row:
        #     items.append({'logtimeid': x[0], 'horiangle': x[1], 'temp': x[2]})
        radars=[]
        for x in row:
            radars.append({'radarid': x[0], 'startaziangleip': x[1],'endaziangleip': x[2], 'eleangleip': x[3], 'scan_rateip': x[4], 'timestampip': x[5]}, )
        # connection.commit()
        connection.close()
        
        return {
            'resultStatus': 'SUCCESS',
            'radars': radars}

