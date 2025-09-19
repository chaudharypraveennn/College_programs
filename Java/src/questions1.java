import java.util.Scanner;
public class questions1 {
    public static void main(String[] args) {

        int n = 9;
        int m = 5;

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if(i % j == 0) {
                    System.out.print("*");
                } else {
                    System.out.print(" ");
                }
            }
            System.out.println();

        }


    }
}
