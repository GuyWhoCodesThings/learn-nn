import torch
class MultiHeadAttention(torch.nn.Module):
  def __init__(self, model_dim, num_heads):
    super().__init__()
    self.model_dim = model_dim
    self.num_heads = num_heads
    self.dk = model_dim // num_heads
    
    self.Wk = torch.nn.Parameter(torch.randn(model_dim, model_dim))
    self.Wq = torch.nn.Parameter(torch.randn(model_dim, model_dim))
    self.Wv = torch.nn.Parameter(torch.randn(model_dim, model_dim))
    self.Wo = torch.nn.Parameter(torch.randn(model_dim, model_dim))

    self.softmax = torch.nn.Softmax(dim=-1)

  def att(self, k, q, v):
    attention_score = torch.matmul(q, k.transpose(-1,-2)) / self.dk ** 0.5
    attention_score = self.softmax(attention_score)
    output = attention_score @ v
    return output

  def split(self, m):
    batch_size, seq_len, model_dim = m.shape
    m = torch.reshape(m, (batch_size, seq_len, self.num_heads, self.dk))
    m = m.transpose(1, 2)
    return m

  def combine(self, m):
    batch_size, num_heads, seq_len, dk = m.shape
    m = m.transpose(1,2)
    m = m.reshape(batch_size, seq_len, self.model_dim)
    return m

  def forward(self, q, k, v):
    Q = self.split(q @ self.Wq)
    K = self.split(k @ self.Wk)
    V = self.split(v @ self.Wv)
    out = self.att(K, Q, V)
    return self.combine(out) @  self.Wo