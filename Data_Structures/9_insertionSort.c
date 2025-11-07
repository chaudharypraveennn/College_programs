#include <stdio.h>
#include <stdlib.h>

void insertionSort(int arr[], int size);
void printArray(int arr[], int size);

int main()
{
    int arr[100], size, i, j, key, temp;

    printf("Enter the size of an array: ");
    scanf("%d", &size);

    printf("Enter %d elements: ", size);
    for (i = 0; i < size; i++)
    {
        scanf("%d", &arr[i]);
    }

    printf("Array elements are: \n");
    printArray(arr, size);

    insertionSort(arr, size);

    printf("Sorted array elements are: \n");
    printArray(arr, size);

    return 0;
}

void insertionSort(int arr[], int size)
{
    int i, j, key;
    for (i = 1; i < size; i++)
    {
        key = arr[i];
        j = i - 1;

        while (j >= 0 && arr[j] > key)
        {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}

void printArray(int arr[], int size)
{
    for (int i = 0; i < size; i++)
    {
        printf("%d ", arr[i]);
    }
    printf("\n");
}