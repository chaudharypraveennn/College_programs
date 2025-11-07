
#include <stdio.h>
#include <conio.h>

int main() {
    int arr[100], size, key, beg, end, mid, found = 0;

    printf("Enter the size of an array: ");
    scanf("%d", &size);

    printf("Enter %d elements: ", size);
    for (int i = 0; i < size; i++) {
        scanf("%d", &arr[i]);
    }

    printf("Array elements are: \n");
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    
    printf("\n");

    printf("Enter the key to search: ");
    scanf("%d", &key);

    beg = 0;
    end = size - 1;

    while (beg <= end) {
        mid = beg + (end - beg) / 2;

        if (arr[mid] == key) {
            found = 1;
            break;
        }
        if (arr[mid] < key) {
            beg = mid + 1;
        } else {
            end = mid - 1;
        }
    }

    if (found) {
        printf("Element's index is: %d\n", mid);
    } else {
        printf("Not found!\n");
    }

    return 0;
}