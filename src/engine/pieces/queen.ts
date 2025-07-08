import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import gameSettings from "../gameSettings";

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let availableMoves: Square[] = [];

        this.getAvailableMovesLaterally(board, availableMoves);
        this.getAvailableMovesDiagonally(board, availableMoves);

        return availableMoves;
    }

    private getAvailableMovesDiagonally(board: Board, availableMoves: Square[]) {
        const helperPosition: Square = board.findPiece(this);

        let candidatePosition = new Square(helperPosition.row, helperPosition.col);
        // forwards up diagonal
        while (candidatePosition.row < gameSettings.BOARD_SIZE - 1 && candidatePosition.col < gameSettings.BOARD_SIZE - 1) {
            candidatePosition.row++;
            candidatePosition.col++;
            availableMoves.push(new Square(candidatePosition.row, candidatePosition.col));
        }

        candidatePosition = new Square(helperPosition.row, helperPosition.col);
        // forwards down diagonal
        while (candidatePosition.row > 0 && candidatePosition.col > 0) {
            candidatePosition.row--;
            candidatePosition.col--;
            availableMoves.push(new Square(candidatePosition.row, candidatePosition.col));
        }

        candidatePosition = new Square(helperPosition.row, helperPosition.col);
        // backwards up diagonal
        while (candidatePosition.row < gameSettings.BOARD_SIZE - 1 && candidatePosition.col > 0) {
            candidatePosition.row++;
            candidatePosition.col--;
            availableMoves.push(new Square(candidatePosition.row, candidatePosition.col));
        }

        candidatePosition = new Square(helperPosition.row, helperPosition.col);
        // backwards down diagonal
        while (candidatePosition.row > 0 && candidatePosition.col < gameSettings.BOARD_SIZE - 1) {
            candidatePosition.row--;
            candidatePosition.col++;
            availableMoves.push(new Square(candidatePosition.row, candidatePosition.col));
        }
    }

    private getAvailableMovesLaterally(board:Board, availableMoves: Square[]) {
        const queenPosition: Square = board.findPiece(this);

        for (let i = 0; i < gameSettings.BOARD_SIZE; i++) {
            if (i != queenPosition.row) {
                availableMoves.push(new Square(i,  queenPosition.col));
            }
        }

        for (let j = 0; j < gameSettings.BOARD_SIZE; j++) {
            if (j != queenPosition.col) {
                availableMoves.push(new Square(queenPosition.row,  j));
            }
        }
    }
}
