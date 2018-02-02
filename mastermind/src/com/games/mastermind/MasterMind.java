package com.games.mastermind;

import java.io.IOException;
import java.util.Arrays;

import static com.games.mastermind.Util.input;
import static com.games.mastermind.Util.print;
import static com.games.mastermind.Util.randomInt;

public final class MasterMind {

    public static void main(String[] args) throws IOException {
        try {
            System.out.println("Modes:\n\t[1] - computer is code maker\n\t[2] - computer is code breaker\n");
            int mode = Integer.parseInt(input("Enter mode: "));
            MasterMind mastermind = new MasterMind();
            mastermind.play(mode);
        } catch (NumberFormatException e) {
            System.err.println("Invalid mode.");
        }
    }

    public void play(int mode) throws IOException {
        int[] code;
        switch (mode) {
            case 1:
                code = codeMakerComputer();
                codeBreakerHuman(code);
                break;
            case 2:
                code = codeMakerHuman();
                codeBreakerComputer(code);
                break;
            default:
                System.err.println("Unknown game mode.");
        }
    }

    private int[] codeMakerHuman() throws IOException {
        return parseUserInput();
    }

    private void codeBreakerHuman(int[] code) throws IOException {
        int[] guess;
        do {
            guess = parseUserInput();
            String eval = evaluateGuess(code, guess);
            print(Arrays.toString(guess), eval);
        } while(!isGuessCorrect(code, guess));
    }

    private int[] codeMakerComputer() {
        return new int[]{1,4,3,5}; // getRandomCode();
    }

    private void codeBreakerComputer(int[] code) {
        int[][] state = new int[4][6];
        int[] guess = getRandomCode();
        boolean guessed;
        do {
            String eval = evaluateGuess(code, guess);
            print(Arrays.toString(guess), eval);
            guessed = isGuessCorrect(code, guess);
            if (!guessed) {
                updateState(state, guess, eval);
                guess = makeGuess(state);
            }
        } while (!guessed);
    }

    private int[] parseUserInput() throws IOException {
        int[] code;
        do {
            code = parseCode(input("Enter code: "));
        } while (code == null);
        return code;
    }

    private int[] parseCode(String input) {
        if (input.length() != 4) { return null; }
        boolean[] usedColors = new boolean[6];
        int[] code = new int[4];
        for (int i = 0; i < 4; i++) {
            int color = toColor(input.charAt(i));
            if (color != -1 && !usedColors[color - 1]) {
                usedColors[color - 1] = true;
                code[i] = color;
            } else { return null; }
        }
        return code;
    }

    private int toColor(char c) {
        int color = (int) c;
        if (49 <= color && color <= 54) {
            return color - 48;
        } else { return -1; }
    }

    private boolean isGuessCorrect(int[] code, int[] guess) {
        for (int i = 0; i < 4; i++) {
            if (code[i] != guess[i]) { return false; }
        }
        return true;
    }

    private String evaluateGuess(int[] code, int[] guess) {
        String eval = "";
        for (int i = 0; i < 4; i++) {
            int j;
            for (j = 0; j < 4; j++) {
                if (guess[i] == code[j]) {
                    if (i == j) { eval += "b"; }
                    else { eval += "w"; }
                    break;
                }
            }
            if (j == 4) { eval += "."; }
        }
        return eval;
    }

    private int[] getRandomCode() {
        int[] code = new int[4];
        boolean unique;
        for (int i = 0; i < 4; i++) {
            int color;
            do {
                color = randomInt(1, 6);
                unique = true;
                for (int j = 0; j < i; j++) {
                    if (code[j] == color) { unique = false; }
                }
            } while (!unique);
            code[i] = color;
        }
        return code;
    }

    private void updateState(int[][] state, int[] guess, String eval) {
        for (int i = 0; i < 4; i++) {
            switch(eval.charAt(i)) {
                case 'b':
                    for (int j = 0; j < 4; j++) {
                        state[j][guess[i] - 1] = 1;
                    }
                    for (int j = 0; j < 6; j++) {
                        state[i][j] = 1;
                    }
                    state[i][guess[i] - 1] = 2;
                    break;
                case 'w':
                    state[i][guess[i] - 1] = 1;
                    break;
                case '.':
                    for (int j = 0; j < 4; j++) {
                        state[j][guess[i] - 1] = 1;
                    }
                    break;
            }
        }
    }

    private int[] makeGuess(int[][] state) {
        int[] guess = new int[4];
        boolean[] usedColors = new boolean[6];
        for (int i = 0; i < 4; i++) {
            for (int j = 0; j < 6; j++) {
                if (!usedColors[j] && state[i][j] != 1) {
                    usedColors[j] = true;
                    guess[i] = j + 1;
                    break;
                }
            }
        }
        return guess;
    }
}
