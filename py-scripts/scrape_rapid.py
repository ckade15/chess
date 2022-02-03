from optparse import Option
from unicodedata import name
from click import option
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import requests

# Rankings
rankings = []
for i in range(100):
    rankings.append(i+1)


# Headless args
options = webdriver.ChromeOptions()
options.headless = True

# Opens driver window
driver = webdriver.Chrome(executable_path=ChromeDriverManager().install(),chrome_options=options)
driver.get('https://ratings.fide.com/top_lists.phtml')
driver.maximize_window()
time.sleep(3)

# Switches to different blitz rankings
driver.find_element(By.ID, 't11').click()

# Scrapes name data
time.sleep(3)
name_tags = driver.find_elements(By.XPATH, "//td//a")
names = []
for i in name_tags:
    names.append(i.text)

# Scrapes country data
country_tags = driver.find_elements(By.CLASS_NAME, "flag-wrapper")
countries = []
for i in country_tags:
    countries.append(i.text)

# Scrapes rating data
rating_tags = driver.find_elements(By.XPATH, "//tr//td[4]")
ratings = []
for i in rating_tags:
    ratings.append(i.text)

# Scrapes average 12 month data
avg_ratings = []
avg_rating_tags = driver.find_elements(By.XPATH, "//tr//td[6]")
for i in avg_rating_tags:
    avg_ratings.append(i.text)


class Player:
    def __init__(self, ranking, name, country, rating, avg_rating):
        self.ranking = ranking
        self.name = name
        self.country = country
        self.rating = rating
        self.avg_rating = avg_rating
    def initDB():
        return
    
    
        
# Create each player as an object
players = []
for i in range(100):
    players.append(Player(rankings[i], names[i], countries[i], ratings[i], avg_ratings[i]))

for i in range(100):
    print( "%i %s" % (players[i].ranking, players[i].name))

# Adds blitz leaders to the database
url = 'http://localhost:5001/api/v1/rapid'
for i in range(100):
    player = requests.post(url, json={
        "ranking": players[i].ranking,
        "name": players[i].name,
        "country": players[i].country,
        "rating": players[i].rating,
        "avgRating": players[i].avg_rating,
    })
print(player.text)