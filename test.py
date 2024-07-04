import torch
class TanH(torch.nn.Module):
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return x
import sys
import json
import torch
import math
import io
class Capturing(list):
    def __enter__(self):
        self._stdout = sys.stdout
        sys.stdout = self._stringio = io.StringIO()
        return self

    def __exit__(self, *args):
        self.extend(self._stringio.getvalue().splitlines())
        sys.stdout = self._stdout

if __name__ == '__main__':
    x = json.loads(sys.argv[1])
    y = json.loads(sys.argv[2])
    x = torch.tensor(x)
    y = torch.tensor(y)
    m = TanH()

    response = {}
    with Capturing() as output:
        try:
            pred = m(x)
            response['result'] = str(pred)
            torch.testing.assert_close(pred, y)
            response['message'] = 'passed'
        except AssertionError as e:
            response['message'] = f'failed: {e}'
    
    response['out'] = output
    print(json.dumps(response))