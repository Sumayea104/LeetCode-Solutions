import sys

sys.setrecursionlimit(200_000)

class Solution:
    def palindromePath(self, n: int, edges: list[list[int]], s: str, queries: list[str]) -> list[bool]:
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
            
        char_masks = [1 << (ord(ch) - ord('a')) for ch in s]
        
        parent = [0] * n
        depth = [0] * n
        heavy = [-1] * n
        head = [0] * n
        pos = [0] * n
        size = [0] * n
        
        def dfs1(u, p, d):
            depth[u] = d
            parent[u] = p
            size[u] = 1
            max_sub = 0
            for v in adj[u]:
                if v != p:
                    dfs1(v, u, d + 1)
                    size[u] += size[v]
                    if size[v] > max_sub:
                        max_sub = size[v]
                        heavy[u] = v
        
        dfs1(0, 0, 0)
        
        cur_pos = 0
        def dfs2(u, h):
            nonlocal cur_pos
            head[u] = h
            pos[u] = cur_pos
            cur_pos += 1
            
            if heavy[u] != -1:
                dfs2(heavy[u], h)
                
            for v in adj[u]:
                if v != parent[u] and v != heavy[u]:
                    dfs2(v, v)
                    
        dfs2(0, 0)
        
        init_arr = [0] * n
        for i in range(n):
            init_arr[pos[i]] = char_masks[i]
            
        tree = [0] * (2 * n)
        for i in range(n):
            tree[n + i] = init_arr[i]
        for i in range(n - 1, 0, -1):
            tree[i] = tree[2 * i] ^ tree[2 * i + 1]
            
        def update_tree(i, val):
            idx = pos[i] + n
            tree[idx] = val
            idx //= 2
            while idx > 0:
                tree[idx] = tree[2 * idx] ^ tree[2 * idx + 1]
                idx //= 2
                
        def query_tree(l, r):
            res = 0
            l += n
            r += n + 1
            while l < r:
                if l & 1:
                    res ^= tree[l]
                    l += 1
                if r & 1:
                    r -= 1
                    res ^= tree[r]
                l //= 2
                r //= 2
            return res

        def query_path(u, v):
            res = 0
            while head[u] != head[v]:
                if depth[head[u]] < depth[head[v]]:
                    u, v = v, u
                res ^= query_tree(pos[head[u]], pos[u])
                u = parent[head[u]]
            
            if depth[u] > depth[v]:
                u, v = v, u
            res ^= query_tree(pos[u], pos[v])
            return res

        ans = []
        for q in queries:
            parts = q.split()
            if parts[0] == "update":
                u = int(parts[1])
                c = parts[2]
                new_mask = 1 << (ord(c) - ord('a'))
                update_tree(u, new_mask)
            else:
                u = int(parts[1])
                v = int(parts[2])
                path_xor = query_path(u, v)
                if (path_xor & (path_xor - 1)) == 0:
                    ans.append(True)
                else:
                    ans.append(False)
                    
        return ans