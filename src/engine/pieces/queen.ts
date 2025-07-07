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
        const queenInitialPosition: Square = board.findPiece(this);

        let queenCurrentPosition = new Square(queenInitialPosition.row, queenInitialPosition.col);
        // forwards up diagonal
        while (queenCurrentPosition.row < gameSettings.BOARD_SIZE - 1 && queenCurrentPosition.col < gameSettings.BOARD_SIZE - 1) {
            const pieceNearQueen: Piece | undefined = board.getPiece(new Square(++queenCurrentPosition.row, ++queenCurrentPosition.col));
            if (pieceNearQueen) {
                break;
            }
            availableMoves.push(new Square(queenCurrentPosition.row, queenCurrentPosition.col));
        }

        queenCurrentPosition = new Square(queenInitialPosition.row, queenInitialPosition.col);
        // forwards down diagonal
        while (queenCurrentPosition.row > 0 && queenCurrentPosition.col > 0) {
            const pieceNearQueen: Piece | undefined = board.getPiece(new Square(--queenCurrentPosition.row, --queenCurrentPosition.col));
            if (pieceNearQueen) {
                break;
            }
            availableMoves.push(new Square(queenCurrentPosition.row, queenCurrentPosition.col));
        }

        queenCurrentPosition = new Square(queenInitialPosition.row, queenInitialPosition.col);
        // backwards up diagonal
        while (queenCurrentPosition.row < gameSettings.BOARD_SIZE - 1 && queenCurrentPosition.col > 0) {
            const pieceNearQueen: Piece | undefined = board.getPiece(new Square(++queenCurrentPosition.row, --queenCurrentPosition.col));
            if (pieceNearQueen) {
                break;
            }
            availableMoves.push(new Square(queenCurrentPosition.row, queenCurrentPosition.col));
        }

        queenCurrentPosition = new Square(queenInitialPosition.row, queenInitialPosition.col);
        // backwards down diagonal
        while (queenCurrentPosition.row > 0 && queenCurrentPosition.col < gameSettings.BOARD_SIZE - 1) {
            const pieceNearQueen: Piece | undefined = board.getPiece(new Square(--queenCurrentPosition.row, ++queenCurrentPosition.col));
            if (pieceNearQueen) {
                break;
            }
            availableMoves.push(new Square(queenCurrentPosition.row, queenCurrentPosition.col));
        }
    }

    private getAvailableMovesLaterally(board:Board, availableMoves: Square[]) {
        const queenInitialPosition: Square = board.findPiece(this);

        for (let i = queenInitialPosition.row + 1; i < gameSettings.BOARD_SIZE; i++) {
            const pieceNearRook: Piece | undefined = board.getPiece(new Square(i, queenInitialPosition.col));
            if (pieceNearRook) {
                break;
            }

            availableMoves.push(new Square(i,  queenInitialPosition.col));

        }

        for (let i = queenInitialPosition.row - 1; i >= 0; i--) {
            const pieceNearRook: Piece | undefined = board.getPiece(new Square(i, queenInitialPosition.col));
            if (pieceNearRook) {
                break;
            }

            availableMoves.push(new Square(i,  queenInitialPosition.col));

        }

        for (let j = queenInitialPosition.col + 1; j < gameSettings.BOARD_SIZE; j++) {
            const pieceNearRook: Piece | undefined = board.getPiece(new Square(queenInitialPosition.row, j));
            if (pieceNearRook) {
                break;
            }

            availableMoves.push(new Square(queenInitialPosition.row,  j));
        }

        for (let j = queenInitialPosition.col - 1; j >= 0; j--) {
            const pieceNearRook: Piece | undefined = board.getPiece(new Square(queenInitialPosition.row, j));
            if (pieceNearRook) {
                break;
            }

            availableMoves.push(new Square(queenInitialPosition.row,  j));
        }
    }
}
