import torch
class SparseCrossEntropyLossLayer(torch.nn.Module):
    def forward(self, y_pred: torch.Tensor, y_true: torch.Tensor) -> torch.Tensor:
        error = 0
        for i in range(len(y_true)):
            error += -1 * torch.log(y_pred[i][y_true[i]])
        return error / len(y_true)