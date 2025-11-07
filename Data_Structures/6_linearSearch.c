
#include <stdio.h>
#include <stdlib.h>

int linearSearch(int[], int, int);

int main() {

    int arr[100], size, key, result;

    // int arr[] = {100, 200, 300, 400, 500};
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

    result = linearSearch(arr, size, key);

    if (result != -1) {
        printf("Element found at index: %d\n", result);
    } else {
        printf("Not found!\n");
    }

    return 0;
}

int linearSearch(int arr[], int size, int key) {
    for (int i = 0; i < size; i++) {
        if (arr[i] == key) {
            return i;
        }
    }
    return -1;
}

