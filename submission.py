import torch
class LSTM(torch.nn.Module):
    def __init__(self, in_dim, hid_dim):
        super().__init__()
        self.hid_dim = hid_dim
        self.Wf = torch.nn.Parameter(torch.randn(in_dim + hid_dim, hid_dim))
        self.Wi = torch.nn.Parameter(torch.randn(in_dim + hid_dim, hid_dim))
        self.Wo = torch.nn.Parameter(torch.randn(in_dim + hid_dim, hid_dim))
        self.Wc = torch.nn.Parameter(torch.randn(in_dim + hid_dim, hid_dim))

        self.Bf = torch.nn.Parameter(torch.randn(hid_dim))
        self.Bi = torch.nn.Parameter(torch.randn(hid_dim))
        self.Bo = torch.nn.Parameter(torch.randn(hid_dim))
        self.Bc = torch.nn.Parameter(torch.randn(hid_dim))

    def forget(self, x, h):
      cat = torch.cat((x, h), dim=1)
      cat = cat @ self.Wf + self.Bf
      cat = torch.nn.functional.sigmoid(cat)
      return cat
    def input(self, x, h):
      cat = torch.cat((x, h), dim=1)
      return torch.nn.functional.sigmoid(cat @ self.Wi + self.Bf)
    def output(self, x, h):
      cat = torch.cat((x, h), dim=1)
      return torch.nn.functional.sigmoid(cat @ self.Wo + self.Bf)
    def cell(self, x, h):
      cat = torch.cat((x, h), dim=1)
      return torch.nn.functional.tanh(cat @ self.Wf + self.Bf)

    def forward(self, x):

        seq_len, batch_size, _ = x.shape 
        h, c = self.init_hidden(batch_size)
        output = []
        for t in range(seq_len):
                c = self.forget(x[t], h) * c + self.input(x[t], h) * self.cell(x[t], h)
                h = self.output(x[t],h) * torch.nn.functional.tanh(c)
                output.append(h)

        output = torch.stack(output)
        return output

    def init_hidden(self, batch_size):
        return (torch.zeros(batch_size, self.hid_dim), torch.zeros(batch_size, self.hid_dim))