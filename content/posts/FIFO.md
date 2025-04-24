---
title : 'FIFO'
date : '2025-04-04'
---

> 教-博客


```c
#include "fifo.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
/**
 * 函数：模拟FIFO（先进先出）页面置换算法。
 *
 * @param queue_frames 一个字符串，表示页面访问序列。
 *                     字符串中的每个字符是一个数字，表示一个页面号。
 * @param num_frames   页框的数量，表示物理内存中可用的页框数。
 */
void
fifo_page_replacement (char *queue_frames, int num)
{
  // TODO
  int *frames = (int *)malloc (num * sizeof (int));
  int queue_size = 0;
  int queue_index = 0;

  for (int i = 0; i < num; i++) {
    frames[i] = -1; // 初始化页框
  }

  char *token = strtok (queue_frames, ",");
  while (token != NULL) {
    int page = atoi (token);
    printf("Access:%d,Frames: [", page);
    
    int found = 0;

    for (int i = 0; i < num; i ++) {
      if (frames[i] == page) {
        found = 1;
        break;
      }
    }

    if (!found) {
      if (queue_size < num) {
        frames[queue_size ++] = page;
      } else {
        frames[queue_index] = page;
        queue_index = (queue_index + 1) % num;
      }
    }

    for (int i = 0; i < num; i++) {
      printf("%d", frames[i]);
      if (i != num - 1) printf(",");
    }
    printf("]\n");

    token = strtok(NULL, ",");
  }

  free(frames);
}
```