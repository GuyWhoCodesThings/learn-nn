import torch
class LeakyReLU(torch.nn.Module):
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return torch.max(x, 0.1 * x)
