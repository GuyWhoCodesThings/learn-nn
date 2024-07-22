import sys
import json
import torch
import io
import submission
from functools import wraps

class Capturing(list):
    def __enter__(self):
        self._stdout = sys.stdout
        sys.stdout = self._stringio = io.StringIO()
        return self

    def __exit__(self, *args):
        self.extend(self._stringio.getvalue().splitlines())
        sys.stdout = self._stdout

if __name__ == '__main__':
    
    torch.manual_seed(0)
    original_state = torch.random.get_rng_state()
    response = {}
    class_name = sys.argv[1]
    inits = json.loads(sys.argv[2])
    inputs = json.loads(sys.argv[3])
    outputs = json.loads(sys.argv[4])

    for i in range(len(inputs)):
        inputs[i] = torch.tensor(inputs[i])
    for i in range(len(outputs)):
        outputs[i] = torch.tensor(outputs[i])
    
    try:
        class_ref = getattr(submission, class_name)
    except AttributeError:
        raise ValueError(f"Unknown function name: {class_name}")
    
    m = class_ref(*inits)
    
    with Capturing() as output:
        try:
            pred = m(*inputs)
            response['result'] = json.dumps(pred)
            if pred.shape != outputs.shape:
                raise Exception(f'function returned tensor of shape {pred.shape} but should be {outputs.shape}')
            else:
                if pred.shape == torch.Size([]):
                    torch.testing.assert_close(pred, outputs[0].squeeze(), rtol=1e-2, atol=1e-4)
                else:
                    for y_pred, y_true in zip(pred, outputs):
                        torch.testing.assert_close(y_pred, y_true, rtol=1e-2, atol=1e-4)
        except AssertionError as e:
            response['message'] = f'failed: {e}'
    
    response['out'] = "\n".join(output)
    print(json.dumps(response))
    torch.random.set_rng_state(original_state)