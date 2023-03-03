from flask import Flask

app = Flask(__name__)


@app.route('/')
def index():
    return 'server is running'

if __name__ == '__app__':
    app.run(debug=True)

