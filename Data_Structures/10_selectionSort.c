#include <stdio.h>
#include <stdlib.h>

void selectionSort(int arr[], int size);
void printArray(int arr[], int size);

int main()
{
    int arr[100], size, i;

    printf("Enter the size of an array: ");
    scanf("%d", &size);

    printf("Enter %d elements: ", size);
    for (i = 0; i < size; i++)
    {
        scanf("%d", &arr[i]);
    }

    printf("Array elements are: \n");
    printArray(arr, size);

    selectionSort(arr, size);

    printf("Sorted array elements are: \n");
    printArray(arr, size);

    return 0;
}

void selectionSort(int arr[], int size)
{
    for (int i = 0; i < size - 1; i++)
    {
        int min_idx = i;
        for (int j = i + 1; j < size; j++)
        {
            if (arr[j] < arr[min_idx])
            {
                min_idx = j;
            }
        }

        int temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
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