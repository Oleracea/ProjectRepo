#include <string>
#include <iostream>
#include <filesystem>
#include <fstream>
#include <ostream>
#include "miniGit.hpp"

using namespace std;
namespace fs = std::filesystem;

//checks file up to its length so needs to be called twice with two files switched around
bool _checkSame(ifstream* filePrev, ifstream* fileCurr){
    string filePrevLine;
    string hold;
    string fileCurrLine;
    while(*fileCurr >> fileCurrLine){
        *filePrev >> filePrevLine;
        //cout << fileCurrLine << " vs " << filePrevLine << endl;
        if(fileCurrLine != filePrevLine) return false;
        //if two strings are ever different, return false
    }
    return true;
}

//returns true if two files have same content
//this does not account for extra spaces or empty lines
bool checkSame(ifstream* filePrev, ifstream* fileCurr){
    if(_checkSame(filePrev, fileCurr) && _checkSame( filePrev, fileCurr)) return true;
    return false;
}

//copies file from an ifstream to an ofstream
void copy(ifstream* fileIn, ofstream* fileOut){
    string line;
    while(getline(*fileIn, line)){
        *fileOut << line << "\n";
    }
    (*fileIn).close();
    (*fileOut).close();
}

//returns most recent commit number
int miniGit::getCommit(){
    return repoEnd->commitNumber;
}

//constructor
miniGit::miniGit(){
    dNode* node = new dNode;
    repoHead = node;
    repoHead->head = NULL;
    repoHead->commitNumber = 0;
    repoHead->next = NULL;
    repoHead->prev = NULL;
    repoEnd = repoHead;
}

//destructor
miniGit::~miniGit(){
    dNode* node = repoHead;
    dNode* node2 = NULL;
    while(node != NULL){
        sNode* curr = node->head;
        sNode* prev = NULL;
        while (curr != NULL){
            prev = curr;
            curr = curr->next;
            delete prev;
            prev = NULL;
        }
        node2 = node;
        node = node->next;
        delete node2;
        node2 = NULL;
    }
}

//adds file with given file name to the most recent SLL that we are wroking with
bool miniGit::addFile(string filename){
    if (fs::exists(filename) == false){
        return false;
        //if file does not exist, does not add
    }else{
        sNode* curr = repoEnd->head;
        while (curr != NULL){
            if (curr->fileName == filename){
                return false;
            }
            curr = curr->next;
        }
        //if file is already in the list, returns false and does not add
        dNode* tmp = repoEnd;
        int verNum = 0;
        while (tmp != NULL){
            curr = tmp->head;
            while(curr != nullptr){
                if (curr->fileName == filename){
                    if (curr->fileVersion > verNum){
                        verNum = curr->fileVersion;
                    }
                }
                curr = curr->next;
            }
            tmp = tmp->prev;
        }
        //runs through list to verify what version number it should take on (the highest one)
        sNode* node = new sNode;
        node->fileName = filename;
        node->fileVersion = verNum;
        if (repoEnd->head == NULL){
            repoEnd->head = node;
            node->next = NULL;
            return true;
            //if head of end node is null, sets that head to our node
        }else{
            curr = repoEnd->head;
            while (curr->next != NULL){
                curr = curr->next;
            }
            node->next = NULL;
            curr->next = node;
            return true;
            //else appends it at the end
        }
    }
}

bool miniGit::removeFile(string filename){
    sNode* curr = repoEnd->head;
    sNode* prev = NULL;
    if (curr == NULL){
        return false;
    }else if (curr->fileName == filename){
        repoEnd->head = curr->next;
        delete curr;
        return true;
        //if file to be removed is head of list
    }else{
        while (curr != NULL){
            if (curr->fileName == filename){
                prev->next = curr->next;
                delete curr;
                curr = NULL;
                return true;
            }
            //runs through until found and deletes
            prev = curr;
            curr = curr->next;
        }
    }
    return false;
}

bool miniGit::commit(){
    dNode* node = new dNode;
    repoEnd->next = node;
    node->prev = repoEnd;
    node->head = NULL;
    repoEnd = node;
    node->next = NULL;
    node->commitNumber = (node->prev->commitNumber) + 1;
    sNode* tmp = repoEnd->prev->head;
    //first adds a new DLL node
    cout << tmp->fileName << "\n";
    while (tmp != NULL){
        addFile(tmp->fileName);
        tmp = tmp->next;
    }
    tmp = repoEnd->head;
    //copies entire SLL over of last DLL node
    while (tmp != NULL){
        if (fs::exists(".miniGit/" + to_string(tmp->fileVersion) + tmp->fileName)){
            //if file with that name exists in the miniGit subdirectory
            ifstream iFile(tmp->fileName);
            ifstream _iFile(".miniGit/" + to_string(tmp->fileVersion) + tmp->fileName);
            if(!checkSame(&iFile, &_iFile)){
                //if file being commited and file in minigit are different
                cout << "second if\n";
                tmp->fileVersion = (tmp->fileVersion) + 1;
                ifstream iFile(tmp->fileName);
                ofstream oFile(".miniGit/" + to_string(tmp->fileVersion) + tmp->fileName);
                copy(&iFile, &oFile);
                //copies updated version into minigit and increments version number
                cout << "after copy\n";
            }
        }else{
            tmp->fileVersion = 0;
            ifstream iFile(tmp->fileName);
            ofstream oFile(".miniGit/" + to_string(tmp->fileVersion) + tmp->fileName);
            copy(&iFile, &oFile);
            cout << "after copy 2\n";
            //if file does not exist, creates new file and puts it into there with file version 0
        }
        tmp = tmp->next;
    }
    return true;
}

bool miniGit::checkout(int commitNumber){
    dNode* curr = repoHead;
    if (curr == NULL){
        return false;
    }
    while (curr != NULL){
        if (curr->commitNumber == commitNumber){
            //runs through and finds the commit number
            sNode* tmp = curr->head;
            while (tmp != NULL){
                ifstream iFile(".miniGit/" + to_string(tmp->fileVersion) + tmp->fileName);
                ofstream oFile(tmp->fileName);
                copy(&iFile, &oFile);
                //for all files stored in that SLL, copies version from that miniGit into the current files
                tmp = tmp->next;
            }
            return true;

        }
        curr = curr->next;
    }
    return false;
}

//function to print out all DLL nodes and their SLL
void miniGit::printAll(){
    dNode* node = repoHead;
    while (node != NULL){
        cout << node->commitNumber << " | ";
        sNode* curr = node->head;
        while (curr != NULL){
            cout << to_string(curr->fileVersion) + curr->fileName << " --> ";
            curr = curr->next;
        }
        node = node->next;
        cout << endl;
    }
}