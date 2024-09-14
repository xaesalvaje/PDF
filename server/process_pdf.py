from flask import Flask, request, jsonify
from grobid_client.grobid_client import GrobidClient

app = Flask(__name__)

client = GrobidClient(config_path="./config.json")

@app.route('/process_pdf', methods=['POST'])
def process_pdf():
    if 'pdf' not in request.files:
        return jsonify({'success': False, 'error': 'No PDF file uploaded'})
    
    pdf = request.files['pdf']
    pdf.save('temp.pdf')
    
    try:
        client.process("processFulltextDocument", "temp.pdf", output="./output")
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
