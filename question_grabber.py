from bs4 import BeautifulSoup
doc = open("qq.txt","r")

soup = BeautifulSoup(doc, 'html.parser')
questions = soup.findAll("li",{"class":"StudiableMultipleChoiceQuestionList-questionItem"})
for q in questions:
    prompt = q.find("div",{"class":"TestModeMultipleChoiceQuestion-prompt"}).get_text()
    wrong_answers = [i.get_text() for i in q.findAll("li",{"class":"TestModeMultipleChoiceQuestion-choice"}) if len(i["class"])==1 ]
    answer = [i.get_text() for i in q.findAll("li",{"class":"TestModeMultipleChoiceQuestion-choice"}) if len(i["class"])!=1][0]
    print(prompt)
    print(answer.split("EXPLANATION")[0])
    print(wrong_answers)

