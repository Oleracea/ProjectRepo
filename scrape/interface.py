from tkinter import *
import main

COLOR = "black"

root = Tk()
root.title("Tic Tac Toe")
global check


def interfaceMove(board, spot, name):
    board[spot] = 1
    name['text'] = 'X'
    if not (not main.winning(board, 1) and not main.winning(board,2) and not main.boardFull(board)):
        main.make_board(board)
        for index in range(0,9):
            buttonList[index]['text'] = ""
        return
    value = main.computerMove(board)
    buttonList[value]['text'] = 'O'
    if not (not main.winning(board, 1) and not main.winning(board,2) and not main.boardFull(board)):
        main.make_board(board)
        for index in range(0,9):
            buttonList[index]['text'] = ""
        return


board = []
main.make_board(board)
button0 = Button(root, text = "", padx = 30, pady = 30, command = lambda:interfaceMove(board, 0, button0))
button1 = Button(root, text = "",padx = 30, pady = 30, command = lambda:interfaceMove(board, 1, button1))
button2 = Button(root, text = "",padx = 30, pady = 30, command = lambda:interfaceMove(board, 2, button2))
button3 = Button(root, text = "",padx = 30, pady = 30, command = lambda:interfaceMove(board, 3, button3))
button4 = Button(root, text = "",padx = 30, pady = 30, command = lambda:interfaceMove(board, 4, button4))
button5 = Button(root, text = "",padx = 30, pady = 30, command = lambda:interfaceMove(board, 5, button5))
button6 = Button(root, text = "",padx = 30, pady = 30, command = lambda:interfaceMove(board, 6, button6))
button7 = Button(root, text = "",padx = 30, pady = 30, command = lambda:interfaceMove(board, 7, button7))
button8 = Button(root, text = "",padx = 30, pady = 30, command = lambda:interfaceMove(board, 8, button8))
global buttonList
buttonList = [button0, button1,button2,button3,button4,button5,button6,button7,button8]

button0.grid(row = 0, column = 0)
button1.grid(row = 0, column = 1)
button2.grid(row = 0, column = 2)
button3.grid(row = 1, column = 0)
button4.grid(row = 1, column = 1)
button5.grid(row = 1, column = 2)
button6.grid(row = 2, column = 0)
button7.grid(row = 2, column = 1)
button8.grid(row = 2, column = 2)

root.mainloop()

def interfaceRun():
    board = []
    main.make_board(board)
    check = False
    # button0 = Button(root, text = "", padx = 30, pady = 30, command = lambda:interfaceMove(board, 0, button0)).grid(row = 0, column = 0)
    # button1 = Button(root, text = "",padx = 30, pady = 30, command = lambda:interfaceMove(board, 1, button1)).grid(row = 0, column = 1)
    # button2 = Button(root, text = "",padx = 30, pady = 30, command = lambda:interfaceMove(board, 2, button2)).grid(row = 0, column = 2)
    # button3 = Button(root, text = "",padx = 30, pady = 30, command = lambda:interfaceMove(board, 3, button3)).grid(row = 1, column = 0)
    # button4 = Button(root, text = "",padx = 30, pady = 30, command = lambda:interfaceMove(board, 4, button4)).grid(row = 1, column = 1)
    # button5 = Button(root, text = "",padx = 30, pady = 30, command = lambda:interfaceMove(board, 5, button5)).grid(row = 1, column = 2)
    # button6 = Button(root, text = "",padx = 30, pady = 30, command = lambda:interfaceMove(board, 6, button6)).grid(row = 2, column = 0)
    # button7 = Button(root, text = "",padx = 30, pady = 30, command = lambda:interfaceMove(board, 7, button7)).grid(row = 2, column = 1)
    # button8 = Button(root, text = "",padx = 30, pady = 30, command = lambda:interfaceMove(board, 8, button8)).grid(row = 2, column = 2)
    # buttonList = [button0, button1,button2,button3,button4,button5,button6,button7,button8]
    # root.mainloop()
    # while not main.winning(board, 1) and not main.winning(board,2) and not main.boardFull(board):
    #     if check:
    #         value = main.computerMove(board)
    #         buttonList[value]['text'] = 'O'
    #         check = False

