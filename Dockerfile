FROM python:3.9-slim

# Install Flask and GROBID client
RUN pip install Flask grobid-client-python

# Set up the working directory
WORKDIR /app

# Copy all files
COPY . .

# Expose the port Flask is running on
EXPOSE 5000

# Run the Flask server
CMD ["python", "server/process_pdf.py"]
