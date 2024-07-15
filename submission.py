import torch
class DotProductAttention(torch.nn.Module):
    def __init__(self, model_dim, dk, dv):
        super().__init__()
        self.model_dim = model_dim
        self.Wk = torch.nn.Linear(model_dim, dk)
        self.Wq = torch.nn.Linear(model_dim, dk)
        self.Wv = torch.nn.Linear(model_dim, dv)

    def forward(self, x):
        K = self.Wk(x)
        Q = self.Wq(x)
        V = self.Wv(x)
        score = torch.matmul(Q, K.transpose(1, 2)) / self.model_dim ** 0.5
        score = torch.nn.functional.softmax(score, -1)
        return torch.matmul(score, V)
