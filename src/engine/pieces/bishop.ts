import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import gameSettings from "../gameSettings";
import King from "./king";

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    private takePieceIfPossible(board: Board, row: number, col: number, availableMoves: Square[]): Piece | undefined {
        const pieceNearBishop: Piece | undefined = board.getPiece(new Square(row, col));
        if (pieceNearBishop) {
            if (pieceNearBishop.player != this.player && !(pieceNearBishop instanceof King)) {
                availableMoves.push(new Square(row,  col));
            }
        }
        return pieceNearBishop;
    }

    public getAvailableMoves(board: Board) {

        let availableMoves: Square[] = [];
        const positionHelper: Square = board.findPiece(this);

        let candidatePosition = new Square(positionHelper.row, positionHelper.col);
        // forwards up diagonal
        while (candidatePosition.row < gameSettings.BOARD_SIZE - 1 && candidatePosition.col < gameSettings.BOARD_SIZE - 1) {
            candidatePosition.row++;
            candidatePosition.col++;

            if (this.takePieceIfPossible(board, candidatePosition.row, candidatePosition.col, availableMoves)) {
                break;
            }
            availableMoves.push(new Square(candidatePosition.row, candidatePosition.col));
        }

        candidatePosition = new Square(positionHelper.row, positionHelper.col);
        // forwards down diagonal
        while (candidatePosition.row > 0 && candidatePosition.col > 0) {
            candidatePosition.row--;
            candidatePosition.col--;

            if (this.takePieceIfPossible(board, candidatePosition.row, candidatePosition.col, availableMoves)) {
                break;
            }
            availableMoves.push(new Square(candidatePosition.row, candidatePosition.col));
        }

        candidatePosition = new Square(positionHelper.row, positionHelper.col);
        // backwards up diagonal
        while (candidatePosition.row < gameSettings.BOARD_SIZE - 1 && candidatePosition.col > 0) {
            candidatePosition.row++;
            candidatePosition.col--;

            if (this.takePieceIfPossible(board, candidatePosition.row, candidatePosition.col, availableMoves)) {
                break;
            }
            availableMoves.push(new Square(candidatePosition.row, candidatePosition.col));
        }

        candidatePosition = new Square(positionHelper.row, positionHelper.col);
        // backwards down diagonal
        while (candidatePosition.row > 0 && candidatePosition.col < gameSettings.BOARD_SIZE - 1) {
            candidatePosition.row--;
            candidatePosition.col++;

            if (this.takePieceIfPossible(board, candidatePosition.row, candidatePosition.col, availableMoves)) {
                break;
            }
            availableMoves.push(new Square(candidatePosition.row, candidatePosition.col));
        }

        return availableMoves;
    }
}
