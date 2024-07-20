import torch
class MultiHeadAttention(torch.nn.Module):
  def __init__(self, model_dim, num_heads):
    super().__init__()
    assert model_dim % num_heads == 0
    self.model_dim = model_dim
    self.num_heads = num_heads
    self.dk = model_dim // num_heads
    self.Wk = torch.nn.Linear(model_dim, model_dim)
    self.Wq = torch.nn.Linear(model_dim, model_dim)
    self.Wv = torch.nn.Linear(model_dim, model_dim)
    self.Wo = torch.nn.Linear(model_dim, model_dim)
    self.softmax = torch.nn.Softmax(dim=-1)


  def att(self, k, q, v):
    attention_score = torch.matmul(q, k.transpose(-1,-2)) / self.dk ** 0.5
    attention_score = self.softmax(attention_score)
    output = attention_score @ v
    return output


  # (batch_size, seq_len, model_dim) => (batch_size, dk, seq_len, model_dim)
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

  def forward(self, x):
    K = self.split(self.Wk(x))
    Q = self.split(self.Wq(x))
    V = self.split(self.Wv(x))
    out = self.att(K, Q, V)
    return self.Wo(self.combine(out))
   

