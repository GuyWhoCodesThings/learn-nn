import torch
class Attention(torch.nn.Module):
  def __init__(self, model_dim, dk, dv):
    super().__init__()
    self.model_dim = model_dim
    self.Wk = torch.nn.Parameter(torch.randn(model_dim, dk))
    self.Wq = torch.nn.Parameter(torch.randn(model_dim, dk))
    self.Wv = torch.nn.Parameter(torch.randn(model_dim, dv))

  def forward(self, q, k, v):
    Q = q @ self.Wq
    K = k @ self.Wk
    V = v @ self.Wv
    score = (Q @ K.transpose(1, 2)) / self.model_dim ** 0.5
    score = torch.nn.functional.softmax(score, -1)
    return score @ V