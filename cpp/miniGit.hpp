#pragma once
#include <string>
#include <iostream>
#include <filesystem>
#include <fstream>
#include <ostream>

using namespace std;

struct sNode{
    string fileName;
    int fileVersion;
    sNode* next;
    //naming would be "0test.txt" or "1test.txt"
};


struct dNode{
    int commitNumber;
    sNode* head;
    dNode* prev;
    dNode* next;
};

class miniGit{
    private:
        dNode* repoHead;
        dNode* repoEnd;
    public:
        miniGit();
        ~miniGit();
        int getCommit();
        bool addFile(string filename);
        bool removeFile(string filename);
        bool commit();
        bool checkout(int commitNumber); 
        void printAll();
};