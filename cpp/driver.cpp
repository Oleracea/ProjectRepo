#include <iostream>
#include <string>
#include <fstream>
#include <ostream>
#include <filesystem>
#include "miniGit.hpp"

using namespace std;
namespace fs = std::filesystem;

int main(){
    int input;
    string fileIn;
    cout << "Enter 1 to initialize an empty repository.\nEnter 2 to exit.\n";
    cin >> input;
    if (input == 2){
        cout << "Exiting program...\n";
        return 0;
    }else if (input == 1){
        fs::remove_all(".miniGit");
        fs::create_directory(".miniGit");

        miniGit git;

        while (input != 5){
            cout << "----- CHOOSE AN OPTION -----\n\n" <<
            "(1) ADD FILE TO REPOSITORY\n" <<
            "(2) REMOVE FILE FROM REPOSITORY\n" <<
            "(3) COMMIT CHANGES TO REPOSITORY\n" <<
            "(4) CHECKOUT FROM REPOSITORY\n" <<
            "(5) EXIT\n" <<
            "(6) PRINT ALL\n\n";
            cin >> input;
            switch(input){
                case 1:
                    //adds file
                    while (true){
                        cout << "Enter a filename.\n";
                        cin >> fileIn;
                        if (fs::exists(fileIn) == false){
                            cout << "Invalid filename.\n\n";
                            continue;
                        }else{
                            if (git.addFile(fileIn) == false){
                                cout << "File not added. Returning to menu.\n";
                            }else{
                                cout << "File added successfully\n";
                            }
                            break;
                        }
                    }  
                    break;
                case 2:
                    //removes file
                    cout << "Enter a filename.\n";
                    cin >> fileIn;
                    if (git.removeFile(fileIn) == false){
                        cout << "File not found. Returning to menu.\n";
                    }else{
                        cout << "File removed successfully.\n";
                    }
                    break;
                case 3:
                    //commits most recent SLL beign worked on
                    git.commit();
                    break;
                case 4:
                    //checks out given commit number
                    cout << "Warning: local changes will be lost if different version is checked out...\n" <<
                    "Do you wish to continue?\n(Y) yes\n(N) no\n";
                    cin >> fileIn;
                    if (fileIn == "Y"){
                        cout << "Enter a commit number.\n";
                        cin >> fileIn;
                        if(git.checkout(stoi(fileIn))){
                            //checks out given commit number
                            while (true){
                                cout << "You cannot manipulate access your miniGit menu while performing checkout on a previous version.\n" <<
                                "Press (Y) to return to the menu when you are done accessing this version.\n\n";
                                cin >> fileIn;
                                if (fileIn == "Y"){
                                    cout << "Returning to most recent version...\n";
                                    git.checkout(git.getCommit());
                                    //checks out most recent commit number to return to most recent SLL
                                    break;
                                }
                            }
                        } else {
                            //if commit returns false, invalid commit number given
                            cout << "Invalid commit number given\nNow returning to menu...\n";
                        }
                    }else if (fileIn == "N"){
                        cout << "Returning to menu...\n\n";
                    }else{
                        cout << "Invalid input. Returning to menu...\n\n";
                    }
                    break;
                case 5:
                    //exit
                    cout << "Exiting program...\n";
                    return 0;
                    break;
                case 6:
                    //prints everyting
                    git.printAll();
                    break;
                default:
                    cout << "Invalid input.\n";
                    input = 0;
                    break;
            }
        }
    }else{
        cout << "Invalid input. Terminating program.\n";
        return 0;
    }
    return 0;
}
