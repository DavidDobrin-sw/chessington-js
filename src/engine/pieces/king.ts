import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import gameSettings from "../gameSettings";

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let availableMoves: Square[] = [];
        const kingInitialPosition: Square = board.findPiece(this);

        const kingMoves: number[][] = [[0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [1, 1]];

        for (let i = 0; i < kingMoves.length; i++) {
            const nextRow = kingInitialPosition.row + kingMoves[i][0];
            const nextCol = kingInitialPosition.col + kingMoves[i][1];
            const nextKingMove: Square = new Square(nextRow, nextCol);
            if (!this.isSquareInBounds(nextKingMove)) {
                continue;
            }
            const pieceAtNextKingMove: Piece | undefined = board.getPiece(nextKingMove);
            if(!pieceAtNextKingMove || (pieceAtNextKingMove && pieceAtNextKingMove.player != this.player && !(pieceAtNextKingMove instanceof King))) {
                availableMoves.push(new Square(kingInitialPosition.row + kingMoves[i][0], kingInitialPosition.col + kingMoves[i][1]));
            }
        }

        return availableMoves;
    }

    private isSquareInBounds(position: Square): boolean {
        return position.row >= 0 && position.col >= 0 && position.row < gameSettings.BOARD_SIZE && position.col < gameSettings.BOARD_SIZE;
    }
}
