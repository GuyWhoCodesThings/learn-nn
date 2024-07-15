import torch
class RNN(torch.nn.Module):
    def __init__(self, in_dim, out_dim, hid_dim):
        super().__init__()
        self.hid_dim = hid_dim
        self.Wh = torch.nn.Linear(hid_dim, hid_dim)
        self.Wi = torch.nn.Linear(in_dim, hid_dim)
        self.Wo = torch.nn.Linear(hid_dim, out_dim)

    def forward(self, x):
        seq_len, batch_size, _ = x.shape 
        hidden = self.init_hidden(batch_size)
        out = []
        for t in range(seq_len):
            hidden = torch.tanh(self.Wh(hidden) + self.Wi(x[t]))
            out.append(torch.tanh(self.Wo(hidden)))
        out = torch.stack(out)
        return (out, hidden)
        # return (out, hidden)
        # out - (seq_len, batch_size, out_dim)
        # hidden - (batch_size, hid_dim)

    def init_hidden(self, batch_size):
        return torch.zeros(batch_size, self.hid_dim)