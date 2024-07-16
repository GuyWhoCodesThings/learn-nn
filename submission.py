import torch
class ReLU(torch.nn.Module):
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return torch.max(x, torch.zeros_like(x))