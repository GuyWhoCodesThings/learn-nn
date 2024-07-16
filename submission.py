import torch
class Sigmoid(torch.nn.Module):
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return 1 / (1 + torch.exp(-x))