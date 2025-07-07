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
        const bishopInitialPosition: Square = board.findPiece(this);

        let bishopCurrentPosition = new Square(bishopInitialPosition.row, bishopInitialPosition.col);
        // forwards up diagonal
        while (bishopCurrentPosition.row < gameSettings.BOARD_SIZE - 1 && bishopCurrentPosition.col < gameSettings.BOARD_SIZE - 1) {
            bishopCurrentPosition.row++;
            bishopCurrentPosition.col++;

            if (this.takePieceIfPossible(board, bishopCurrentPosition.row, bishopCurrentPosition.col, availableMoves)) {
                break;
            }
            availableMoves.push(new Square(bishopCurrentPosition.row, bishopCurrentPosition.col));
        }

        bishopCurrentPosition = new Square(bishopInitialPosition.row, bishopInitialPosition.col);
        // forwards down diagonal
        while (bishopCurrentPosition.row > 0 && bishopCurrentPosition.col > 0) {
            bishopCurrentPosition.row--;
            bishopCurrentPosition.col--;

            if (this.takePieceIfPossible(board, bishopCurrentPosition.row, bishopCurrentPosition.col, availableMoves)) {
                break;
            }
            availableMoves.push(new Square(bishopCurrentPosition.row, bishopCurrentPosition.col));
        }

        bishopCurrentPosition = new Square(bishopInitialPosition.row, bishopInitialPosition.col);
        // backwards up diagonal
        while (bishopCurrentPosition.row < gameSettings.BOARD_SIZE - 1 && bishopCurrentPosition.col > 0) {
            bishopCurrentPosition.row++;
            bishopCurrentPosition.col--;

            if (this.takePieceIfPossible(board, bishopCurrentPosition.row, bishopCurrentPosition.col, availableMoves)) {
                break;
            }
            availableMoves.push(new Square(bishopCurrentPosition.row, bishopCurrentPosition.col));
        }

        bishopCurrentPosition = new Square(bishopInitialPosition.row, bishopInitialPosition.col);
        // backwards down diagonal
        while (bishopCurrentPosition.row > 0 && bishopCurrentPosition.col < gameSettings.BOARD_SIZE - 1) {
            bishopCurrentPosition.row--;
            bishopCurrentPosition.col++;

            if (this.takePieceIfPossible(board, bishopCurrentPosition.row, bishopCurrentPosition.col, availableMoves)) {
                break;
            }
            availableMoves.push(new Square(bishopCurrentPosition.row, bishopCurrentPosition.col));
        }

        return availableMoves;
    }
}
