from flask import Flask, request, send_file
import requests
from flask_cors import CORS
from bs4 import BeautifulSoup
import os

app = Flask(__name__)
CORS(app)

# Set a common browser user agent to simulate a real browser
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"

@app.route('/', methods=['GET'])
def home():
    return send_file('templates/search.html')


@app.route('/search', methods=['POST'])
def search():
    form_data = request.form
    try:
        # Add User-Agent header to make request look like it's coming from a browser
        headers = {
            "User-Agent": USER_AGENT
        }
        
        # Sending request to the Library of Babel search page
        response = requests.post('https://libraryofbabel.info/search.cgi', data=form_data, headers=headers)
        response.raise_for_status()
        
        # Parse the HTML response
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Remove all form elements like textareas and buttons
        for element in soup.find_all(['textarea', 'input']):
            element.decompose()  # Remove the element from the HTML
        
        # Remove "Back to Portal" link if present (it will be added at the end manually)
        back_to_portal_link = soup.find('a', href="https://libraryofbabel.info")
        if back_to_portal_link:
            back_to_portal_link.decompose()
        
        # Add the "Back to Portal" button at the end of the response
        back_to_portal_button = soup.new_tag('p', style="text-align: center; font-size: 17px; font-family: 'Courier', monospace;")
        back_to_portal_button.string = 'Back to Portal'
        back_to_portal_button['id'] = 'link'
        back_to_portal_button.insert(0, soup.new_tag('a', href="https://libraryofbabel.info", style="font-family: 'Courier', monospace"))
        
        # Append the button at the end of the page
        soup.body.append(back_to_portal_button)
        
        # Return the cleaned HTML content
        return str(soup)

    except requests.RequestException as e:
        print(f"Error making request: {e}")
        return f"Error occurred while searching: {str(e)}", 500


@app.route('/browse', methods=['POST'])
def browse():
    form_data = request.form
    print(form_data)
    try:
        # Add User-Agent header to make request look like it's coming from a browser
        headers = {
            "User-Agent": USER_AGENT
        }
        
        # Ensure form_data is sent as a dictionary
        data = {key: value for key, value in form_data.items()}
        
        # Sending request to the Library of Babel browse page
        response = requests.post('https://libraryofbabel.info/browse.cgi', data=data, headers=headers)

        # Check if request was successful
        response.raise_for_status()
        
        # Parse the HTML response
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Clean up the HTML (similar to what you did in the /search route)
        for element in soup.find_all(['textarea', 'input']):
            element.decompose()  # Remove the element from the HTML
        
        # Remove "Back to Portal" link if present
        back_to_portal_link = soup.find('a', href="https://libraryofbabel.info")
        if back_to_portal_link:
            back_to_portal_link.decompose()
        
        # Add the "Back to Portal" button at the end of the response
        back_to_portal_button = soup.new_tag('p', style="text-align: center; font-size: 17px; font-family: 'Courier', monospace;")
        back_to_portal_button.string = 'Back to Portal'
        back_to_portal_button['id'] = 'link'
        back_to_portal_button.insert(0, soup.new_tag('a', href="https://libraryofbabel.info", style="font-family: 'Courier', monospace"))
        
        # Append the button at the end of the page
        soup.body.append(back_to_portal_button)
        
        # Return the cleaned HTML content
        return str(soup)

    except requests.RequestException as e:
        print(f"Error making request: {e}")
        return f"Error occurred while browsing: {str(e)}", 500

@app.route('/titler', methods=['POST'])
def titler():
    form_data = request.form
    try:
        # Add User-Agent header to make request look like it's coming from a browser
        headers = {
            "User-Agent": USER_AGENT
        }
        
        # Ensure form_data is sent as a dictionary
        data = {key: value for key, value in form_data.items()}
        
        # Sending request to the Library of Babel titler page
        response = requests.post('https://libraryofbabel.info/titler.cgi', data=data, headers=headers)
        
        # Check if request was successful
        response.raise_for_status()
        
        # Return the response content as is (it will be the raw HTML response)
        return response.text

    except requests.RequestException as e:
        print(f"Error making request: {e}")
        return f"Error occurred while requesting the titler: {str(e)}", 500
    

@app.route('/book', methods=['GET'])
def book():
    try:
        # Get the path from the query parameter
        path = request.args.get('path')

        if not path:
            return "Path is required", 400
        
        # Construct the URL with the path
        url = f"https://libraryofbabel.info/book.cgi?t={path}"

        # Add User-Agent header to make request look like it's coming from a browser
        headers = {
            "User-Agent": USER_AGENT
        }

        # Sending GET request to the Library of Babel book page
        response = requests.get(url, headers=headers)
        response.raise_for_status()

        # Return the HTML content from the external URL
        return response.text

    except requests.RequestException as e:
        print(f"Error making request: {e}")
        return f"Error occurred while fetching the book: {str(e)}", 500


@app.route('/random', methods=['GET'])
def random_book():
    try:
        # Construct the URL for the Library of Babel's random book
        url = "https://libraryofbabel.info/random.cgi"

        # Add User-Agent header to make request look like it's coming from a browser
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }

        # Send GET request to the Library of Babel book page
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise an error for bad responses

        # Return the HTML content from the external URL
        return response.text

    except requests.RequestException as e:
        print(f"Error making request: {e}")
        return f"Error occurred while fetching the book: {str(e)}", 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)
