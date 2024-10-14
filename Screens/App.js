import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [player1Score, setPlayer1Score] = useState(0); // Score for Player 1 (X)
  const [player2Score, setPlayer2Score] = useState(0); // Score for Player 2 (O)
  const [winnerDeclared, setWinnerDeclared] = useState(false); // To prevent multiple score increments
  const [nextPlayer, setNextPlayer] = useState('X'); // Keep track of the next starting player

  const winner = calculateWinner(board);

  const handlePress = (index) => {
    if (board[index] || winner || winnerDeclared) return; // Ignore if already clicked or game won

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const renderSquare = (index) => (
    <TouchableOpacity onPress={() => handlePress(index)} style={styles.square}>
      <Text style={styles.squareText}>{board[index]}</Text>
    </TouchableOpacity>
  );

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(nextPlayer === 'X'); // Set the turn to the next starting player
    setWinnerDeclared(false); // Reset the winner flag
  };

  const resetScores = () => {
    setPlayer1Score(0);
    setPlayer2Score(0);
    setNextPlayer('X'); // Reset next player to X if you want to start fresh with the scores
  };

  // Update scores and change the starting player when the winner is determined
  useEffect(() => {
    if (winner && !winnerDeclared) {
      if (winner === 'X') {
        setPlayer1Score(player1Score + 1);
        setNextPlayer('O'); // O starts the next game
      } else if (winner === 'O') {
        setPlayer2Score(player2Score + 1);
        setNextPlayer('X'); // X starts the next game
      }
      setWinnerDeclared(true); // To avoid updating score multiple times
    }
  }, [winner, winnerDeclared, player1Score, player2Score]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{winner ? `Winner: ${winner}` : `Next Player: ${isXNext ? 'X' : 'O'}`}</Text>
      <View style={styles.board}>
        {[0, 1, 2].map((row) => (
          <View key={row} style={styles.row}>
            {renderSquare(row * 3)}
            {renderSquare(row * 3 + 1)}
            {renderSquare(row * 3 + 2)}
          </View>
        ))}
      </View>

      {/* Updated Scoreboard Design */}
      <View style={styles.scoreBoard}>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>Player X</Text>
          <Text style={styles.scoreValue}>{player1Score}</Text>
        </View>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>Player O</Text>
          <Text style={styles.scoreValue}>{player2Score}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={resetGame} style={styles.resetButton}>
          <Text style={styles.resetText}>Reset Game</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={resetScores} style={styles.resetScoreButton}>
          <Text style={styles.resetScoreText}>Reset Score</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Helper function to calculate the winner
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Return the winner ('X' or 'O')
    }
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'darkorange',
  },
  board: {
    width: Dimensions.get('window').width * 0.8,
    aspectRatio: 0.9,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: '33.33%',
    height: Dimensions.get('window').width * 0.8 / 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4682b4',
    backgroundColor: 'orange',
    borderRadius: 10,
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  squareText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#fff',
  },
  scoreBoard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 20,
  },
  scoreBox: {
    backgroundColor: 'darkorange',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 10,
  },
  scoreLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 20,
  },
  resetButton: {
    padding: 10,
    backgroundColor: 'darkorange',
    borderRadius: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  resetText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resetScoreButton: {
    padding: 10,
    backgroundColor: 'darkorange',
    borderRadius: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  resetScoreText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TicTacToe;
