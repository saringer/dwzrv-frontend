package com.games.mastermind;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Random;

final class Util {
    static String input(String format, Object... args) throws IOException {
        if (System.console() != null) {
            return System.console().readLine(format, args);
        } else {
            System.out.print(String.format(format, args));
            BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
            return reader.readLine();
        }
    }

    static void print(Object... args) {
        for (Object o : args) {
            System.out.print(o.toString() + " ");
        }
        System.out.println();
    }

    static int randomInt(int min, int max) {
        return new Random().nextInt(max + 1 - min) + min;
    }
}
