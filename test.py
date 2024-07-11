import sys
import json
import torch
import io
import submission


class Capturing(list):
    def __enter__(self):
        self._stdout = sys.stdout
        sys.stdout = self._stringio = io.StringIO()
        return self

    def __exit__(self, *args):
        self.extend(self._stringio.getvalue().splitlines())
        sys.stdout = self._stdout

if __name__ == '__main__':
    response = {}
    class_name = sys.argv[1]
    inputs = [torch.tensor(json.loads(a), dtype=torch.float32) for a in sys.argv[3:]]
    try:
        class_ref = getattr(submission, class_name)
    except AttributeError:
        raise ValueError(f"Unknown function name: {class_name}")
   
    m = class_ref()
    
    with Capturing() as output:
        try:
            pred = m(*inputs)
            response['result'] = str(pred)
            torch.testing.assert_close(pred, torch.tensor(json.loads(sys.argv[2]), dtype=torch.float32), rtol=1e-2, atol=1e-4)
            response['message'] = 'passed'
        except AssertionError as e:
            response['message'] = f'failed: {e}'
    
    response['out'] = "\n".join(output)
    print(json.dumps(response))
