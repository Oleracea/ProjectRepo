import requests
from bs4 import BeautifulSoup
#file = open("8_43.txt", 'a')
count = '43'
next_url = 'yes'
all_names = []
output_names = []
URL = 'https://practicalguidetoevil.wordpress.com/2015/06/10/chapter-11-sucker-punch/'
while URL:
    hold = URL.split('/')
    print(hold)
    name = hold[6]
    print(name)

    page = requests.get(URL)

    soup = BeautifulSoup(page.content, "html.parser")
    for br in soup.find_all("br"):
        br.replace_with(2 * "\n")
    # for br in soup.find_all("</p>"):
    #     br.replace_with(2 * "\n")
    results = soup.find_all("div", class_="entry-content")
    link = soup.find_all("div", class_ = "nav-next")
    file = open(name + '.txt', 'a')
    print(results)
    # line = results.get_text(separator = "\n").strip()
    # print(line)

    for line in results:
        text = line.find_all('p')
        print(text)
        for txt in text:
            print(txt.text + 2 * "\n")
            file.write(txt.text + 2*'\n')
    for iter in link:
        if iter.find('a') is not None: 
            URL = iter.find('a')["href"]
        else:
            URL = None
    file.close()
    if name == "epilogue":
        break
    URL = None


# while next_url:
#     hold = URL.split('/')
#     print(hold)
#     name = hold[6]
#     print(name)
#     if all_names and name + '.txt' == all_names[-1]:
#         break
#     all_names.append(name + '.txt')
#     output_names.append(name + '.epub')
#     file = open(name + '.txt', 'a')
#     count = str(int(count) + 1)
#     page = requests.get(URL)
#     soup = BeautifulSoup(page.content, "html.parser")
#     results = soup.find_all("div", class_="entry-content")
#     for line in results:
#         text = line.find_all('p')
#         for txt in text:
#             file.write(txt.text + 2*'\n')
#         links = line.find_all('a')
#         for link in links:
#             link_url = link["href"]
#             if link.text == "Next Chapter":
#                 print(link_url)
#                 next_url = link_url
#     file.close()
#     URL = next_url


