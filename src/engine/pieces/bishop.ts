import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import gameSettings from "../gameSettings";

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {

        let availableMoves: Square[] = [];
        const bishopInitialPosition: Square = board.findPiece(this);

        let bishopCurrentPosition = new Square(bishopInitialPosition.row, bishopInitialPosition.col);
        // forwards up diagonal
        while (bishopCurrentPosition.row < gameSettings.BOARD_SIZE - 1 && bishopCurrentPosition.col < gameSettings.BOARD_SIZE - 1) {
            const pieceNearBishop: Piece | undefined = board.getPiece(new Square(++bishopCurrentPosition.row, ++bishopCurrentPosition.col));
            if (pieceNearBishop) {
                break;
            }
            availableMoves.push(new Square(bishopCurrentPosition.row, bishopCurrentPosition.col));
        }

        bishopCurrentPosition = new Square(bishopInitialPosition.row, bishopInitialPosition.col);
        // forwards down diagonal
        while (bishopCurrentPosition.row > 0 && bishopCurrentPosition.col > 0) {
            const pieceNearBishop: Piece | undefined = board.getPiece(new Square(--bishopCurrentPosition.row, --bishopCurrentPosition.col));
            if (pieceNearBishop) {
                break;
            }
            availableMoves.push(new Square(bishopCurrentPosition.row, bishopCurrentPosition.col));
        }

        bishopCurrentPosition = new Square(bishopInitialPosition.row, bishopInitialPosition.col);
        // backwards up diagonal
        while (bishopCurrentPosition.row < gameSettings.BOARD_SIZE - 1 && bishopCurrentPosition.col > 0) {
            const pieceNearBishop: Piece | undefined = board.getPiece(new Square(++bishopCurrentPosition.row, --bishopCurrentPosition.col));
            if (pieceNearBishop) {
                break;
            }
            availableMoves.push(new Square(bishopCurrentPosition.row, bishopCurrentPosition.col));
        }

        bishopCurrentPosition = new Square(bishopInitialPosition.row, bishopInitialPosition.col);
        // backwards down diagonal
        while (bishopCurrentPosition.row > 0 && bishopCurrentPosition.col < gameSettings.BOARD_SIZE - 1) {
            const pieceNearBishop: Piece | undefined = board.getPiece(new Square(--bishopCurrentPosition.row, ++bishopCurrentPosition.col));
            if (pieceNearBishop) {
                break;
            }
            availableMoves.push(new Square(bishopCurrentPosition.row, bishopCurrentPosition.col));
        }

        return availableMoves;
    }
}
