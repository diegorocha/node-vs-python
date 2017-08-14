from json import dumps
from flask import Flask
from flask import request
from pika import BlockingConnection, ConnectionParameters, PlainCredentials

app = Flask(__name__)


def send_message_queue(data):
    credentials = PlainCredentials('user', 'pass')
    connection = BlockingConnection(ConnectionParameters('rabbit', 5672, 'vhost', credentials))
    channel = connection.channel()
    channel.queue_declare(queue='tasks')
    channel.basic_publish(exchange='', routing_key='tasks', body=dumps(data))
    connection.close()


@app.route('/api/tasks', methods=['POST'])
def hello():
    data = request.get_json()
    if data and 'foo' in data:
        send_message_queue(data)
        return '', 201
    return '{"error": "foo is required"}', 400


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=9000, debug=True)
