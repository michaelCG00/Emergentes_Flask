from flask import Flask, request, render_template, send_from_directory
from flask_mysqldb import MySQL
from flask_cors import CORS 

import flask
import MySQLdb.cursors
import json

from decimal import *
import json

class decimal_encoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return str(obj)
        return json.JSONEncoder.default(self, obj)

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'dbcontainer'
app.config['MYSQL_USER'] = 'example_user'
app.config['MYSQL_PASSWORD'] = 'mysql'
app.config['MYSQL_DB'] = 'example'
app.config['MYSQL_PORT'] = 3306

mysql = MySQL(app)

@app.route('/students', methods=['GET'])
def student_list_json():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM student')
    data = cursor.fetchall()
    resp = flask.Response(json.dumps(data))
    resp.headers['Content-Type'] = 'application/json'
    return resp

@app.route('/students', methods=['POST'])
def student_post_json():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    data = request.json
    cursor.execute("INSERT INTO student (first_name, last_name, city, semester) VALUES ('%s', '%s', '%s', %i)" % 
                   (data['first_name'], data['last_name'], data['city'], data['semester']))
    
    mysql.connection.commit()
    resp = flask.Response(json.dumps({'result': 'ok'}))
    resp.headers['Content-Type'] = 'application/json'
    return resp

@app.route('/students', methods=['PUT'])
def student_put_json():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    data = request.json
    cursor.execute("UPDATE student SET first_name='%s', last_name='%s', city='%s', semester=%i WHERE id=%i" % 
                   (data['first_name'], data['last_name'], data['city'], data['semester'], data['id']))
    
    mysql.connection.commit()
    resp = flask.Response(json.dumps({'result': 'ok'}))
    resp.headers['Content-Type'] = 'application/json'
    return resp

@app.route('/studentlist', methods=['GET'])
def student_list():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM student')
    data = cursor.fetchall()
    return render_template('list.html', students=data)

#Professor

@app.route('/professors', methods=['GET'])
def professor_list_json():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM professor')
    data = cursor.fetchall()
    resp = flask.Response(json.dumps(data, cls=decimal_encoder))
    resp.headers['Content-Type'] = 'application/json'
    return resp

@app.route('/professor/<int:id>', methods=['GET'])
def professor_by_id_json(id):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM professor WHERE id =%i" % (id))
    data = cursor.fetchall()
    resp = flask.Response(json.dumps(data, cls=decimal_encoder))
    resp.headers['Content-Type'] = 'application/json'
    return resp

@app.route('/professors', methods=['POST'])
def professor_post_json():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    data = request.json
    salary = float(data['salary'])
    cursor.execute("INSERT INTO professor (first_name, last_name, city, address, salary) VALUES ('%s', '%s', '%s','%s', %d)" % 
                   (data['first_name'], data['last_name'], data['city'], data['address'],salary))
    
    mysql.connection.commit()
    resp = flask.Response(json.dumps({'result': 'ok'}))
    resp.headers['Content-Type'] = 'application/json'
    return resp

@app.route('/professors', methods=['PUT'])
def professor_put_json():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    data = request.json
    salary = float(data['salary'])
    cursor.execute("UPDATE professor SET first_name='%s', last_name='%s', city='%s', address='%s', salary=%d WHERE id=%i" % 
                   (data['first_name'], data['last_name'], data['city'], data['address'], salary, data['id']))
    
    mysql.connection.commit()
    resp = flask.Response(json.dumps({'result': 'ok'}))
    resp.headers['Content-Type'] = 'application/json'
    return resp

@app.route('/professor/<int:id>', methods=['DELETE'])
def delete_professor(id):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("DELETE FROM professor WHERE id =%i" % (id))
    mysql.connection.commit()
    resp = flask.Response(json.dumps({'result': 'ok'}))
    resp.headers['Content-Type'] = 'application/json'
    return resp

@app.route('/professorlist', methods=['GET'])
def professor_list():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM professor')
    data = cursor.fetchall()
    return render_template('list.html', students=data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=81, debug=True)
