# Stage 1

## Approach: Priority Inbox

### Priority Logic
Notifications are ranked using two criteria:
1. Type Weight: Placement (3) > Result (2) > Event (1)
2. Recency: Among same type, latest timestamp comes first

### Algorithm
- Fetch all notifications from the API using Bearer token
- Sort using comparator based on weight and timestamp
- Slice top N results

### Handling New Notifications Efficiently
- Use a Max Heap to maintain top N at all times
- When new notification arrives, insert into heap
- If heap size exceeds N, remove lowest priority item
- This gives O(log N) insertion vs O(N log N) for full re-sort

### Time Complexity
- Sorting approach: O(M log M) where M = total notifications
- Heap approach: O(M log N) — more efficient for large streams