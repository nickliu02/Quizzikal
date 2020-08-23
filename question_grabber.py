from bs4 import BeautifulSoup
import requests
doc = open("qq.txt","r")
URL="http://dev.danieliu.xyz:3000/contrib/create"
soup = BeautifulSoup(doc, 'html.parser')
questions = soup.findAll("li",{"class":"StudiableMultipleChoiceQuestionList-questionItem"})
for q in questions:
    prompt = q.find("div",{"class":"TestModeMultipleChoiceQuestion-prompt"}).get_text()
    wrong_answers = [i.get_text() for i in q.findAll("li",{"class":"TestModeMultipleChoiceQuestion-choice"}) if len(i["class"])==1 ]
    answer = [i.get_text() for i in q.findAll("li",{"class":"TestModeMultipleChoiceQuestion-choice"}) if len(i["class"])!=1][0]
    requests.get(url=URL,params={"text":prompt,"answer":answer.split("EXPLANATION")[0],"wrong_answers":wrong_answers})

