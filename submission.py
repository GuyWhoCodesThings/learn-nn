import torch
class PositionalEncoding(torch.nn.Module):
    def __init__(self, max_seq_len, d_model):
        super(PositionalEncoding, self).__init__()

        assert d_model % 2 == 0

        embed = torch.zeros(max_seq_len, d_model)
        pos = torch.arange(max_seq_len).reshape(-1,1)
        denominators = torch.pow(10000, 2*torch.arange(0, d_model//2)/d_model)
        embed[:, 0::2] = torch.sin(pos/denominators)
        embed[:, 1::2] = torch.cos(pos/denominators)
        self.encod = embed
                
    def forward(self, x):
        return x + self.encod