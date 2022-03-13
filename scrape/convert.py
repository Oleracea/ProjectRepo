import pypandoc
import os


for file in os.listdir('./'):
    if file.endswith(".txt"):
        print(file)
        #print(type(file))
        newName = file.strip('tx.')
        newName = newName + '.epub'
        print(newName)
        output = pypandoc.convert_file(file, 'epub', format="", outputfile = newName)