FROM python

WORKDIR /usr/src/bot-getcontest/

COPY . .

RUN pip install --upgrade --no-cache-dir -r requirements.txt

CMD ["python", "main.py"]