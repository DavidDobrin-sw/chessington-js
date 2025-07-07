import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import gameSettings from "../gameSettings";
import King from "./king";

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
            if (this.takePieceIfPossible(board, candidatePosition.row, candidatePosition.col, availableMoves)) {
                break;
            }
            availableMoves.push(new Square(candidatePosition.row, candidatePosition.col));
        }

        candidatePosition = new Square(helperPosition.row, helperPosition.col);
        // forwards down diagonal
        while (candidatePosition.row > 0 && candidatePosition.col > 0) {
            candidatePosition.row--;
            candidatePosition.col--;
            if (this.takePieceIfPossible(board, candidatePosition.row, candidatePosition.col, availableMoves)) {
                break;
            }
            availableMoves.push(new Square(candidatePosition.row, candidatePosition.col));
        }

        candidatePosition = new Square(helperPosition.row, helperPosition.col);
        // backwards up diagonal
        while (candidatePosition.row < gameSettings.BOARD_SIZE - 1 && candidatePosition.col > 0) {
            candidatePosition.row++;
            candidatePosition.col--;
            if (this.takePieceIfPossible(board, candidatePosition.row, candidatePosition.col, availableMoves)) {
                break;
            }
            availableMoves.push(new Square(candidatePosition.row, candidatePosition.col));
        }

        candidatePosition = new Square(helperPosition.row, helperPosition.col);
        // backwards down diagonal
        while (candidatePosition.row > 0 && candidatePosition.col < gameSettings.BOARD_SIZE - 1) {
            candidatePosition.row--;
            candidatePosition.col++;
            if (this.takePieceIfPossible(board, candidatePosition.row, candidatePosition.col, availableMoves)) {
                break;
            }
            availableMoves.push(new Square(candidatePosition.row, candidatePosition.col));
        }
    }

    private getAvailableMovesLaterally(board:Board, availableMoves: Square[]) {
        const queenPosition: Square = board.findPiece(this);

        for (let i = queenPosition.row + 1; i < gameSettings.BOARD_SIZE; i++) {
            if(this.takePieceIfPossible(board, i, queenPosition.col, availableMoves)){
                break;
            }
            availableMoves.push(new Square(i,  queenPosition.col));

        }

        for (let i = queenPosition.row - 1; i >= 0; i--) {
            if(this.takePieceIfPossible(board, i, queenPosition.col, availableMoves)){
                break;
            }

            availableMoves.push(new Square(i,  queenPosition.col));

        }

        for (let j = queenPosition.col + 1; j < gameSettings.BOARD_SIZE; j++) {
            if(this.takePieceIfPossible(board, queenPosition.row, j, availableMoves)){
                break;
            }

            availableMoves.push(new Square(queenPosition.row,  j));
        }

        for (let j = queenPosition.col - 1; j >= 0; j--) {
            if(this.takePieceIfPossible(board, queenPosition.row, j, availableMoves)){
                break;
            }

            availableMoves.push(new Square(queenPosition.row,  j));
        }
    }

    private takePieceIfPossible(board: Board, row: number, col: number, availableMoves: Square[]): Piece | undefined {
        const pieceNearQueen: Piece | undefined = board.getPiece(new Square(row, col));
        if (pieceNearQueen) {
            if (pieceNearQueen.player != this.player && !(pieceNearQueen instanceof King)) {
                availableMoves.push(new Square(row,  col));
            }
        }
        return pieceNearQueen;
    }
}
