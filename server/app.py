from flask import Flask, request

app = Flask(__name__)

@app.route('/')
def index():
    return 'server is running'


@app.route('/chat', methods=['GET', 'POST'])
def chat():
    if request.method == 'POST':
        print(request.get_json()['data'])
        return 'got post request'
    return 'got get request'


if __name__ == '__app__':
    app.run(debug=True)
