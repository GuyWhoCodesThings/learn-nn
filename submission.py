import torch
class RNN(torch.nn.Module):
    def __init__(self, in_dim, out_dim, hid_dim):
        super().__init__()
        self.hid_dim = hid_dim
        self.Wh = torch.randn(hid_dim, hid_dim)
        self.Wi= torch.randn(in_dim, hid_dim)
        self.Wo = torch.randn(hid_dim, out_dim)
        self.bh = torch.randn(hid_dim)
        self.bo = torch.randn(hid_dim)
        
    def forward(self, x):

        seq_len, batch_size, _ = x.shape 
        h = self.init_hidden(batch_size)
        out = []
        for t in range(seq_len):
                h = torch.tanh(
                     h @ self.Wh + x[t] @ self.Wi + self.bh
                )
                out.append(torch.tanh(h @ self.Wo + self.bo))
        out = torch.stack(out)
        return out, h

    def init_hidden(self, batch_size):
        return torch.zeros(batch_size, self.hid_dim)